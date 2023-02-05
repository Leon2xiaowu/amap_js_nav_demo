import {
  animationFrameScheduler,
  filter,
  fromEvent,
  map,
  pairwise,
  retry,
  startWith,
  Subject,
  Subscription,
  tap,
  throttleTime,
} from "rxjs";
import GeometryUtil from "../GeometryUtil";
import { graspRoad, toVector2 } from "../Map/toolkit";
import { CAR_SRC } from "../../assets/default_car_icon";

/**
 * MoveAlong配置项，包括path和speed
 */
interface MovePointOption {
  path: (AMap.LngLat | AMap.LngLatLike)[];
  speed: number;
}

/**
 * 自定义MoveAlong对象
 */
interface MoveAlongObj {
  position: AMap.LngLatLike;
  duration: number;
}

const CAR_SIZE = 36;

export default class MovePoint {
  origin?: AMap.Vector2;
  marker?: AMap.Marker;
  Marker: typeof AMap.Marker;
  map?: AMap.Map;
  Map: typeof AMap;
  passedPolyline?: AMap.Polyline;
  passedHistory: AMap.Polyline[];
  /** moving过程中的轨迹 */
  private _movePassed?: AMap.LngLatLike[];
  private _isMoving?: boolean;
  /** point moving observable */
  private _movingSubscription?: Subscription;
  /** point move finished observable */
  private _moveFinishedSubscription?: Subscription;
  /** Point Move Controller */
  private _moveSubject: Subject<MovePointOption> | null;
  /** 是否在移动过程中实时调整地图中心位置 */
  private _moveFollow?: boolean;

  constructor(
    options: {
      origin?: AMap.LngLatLike;
      map?: AMap.Map;
    },
    Map: typeof AMap
  ) {
    if (options.origin) {
      this.origin = toVector2(options.origin);
    }
    if (options.map) {
      this.map = options.map;
    }
    this.passedHistory = [];
    this.Map = Map;
    this.Marker = Map.Marker;
    this._moveSubject = this.createMoveObservable();

    this.addPoint();
  }

  /**
   * 创建一个 Point Observable
   * @returns Observable
   */
  createMoveObservable() {
    const subject = new Subject<MovePointOption>();

    subject
      .pipe(
        filter(() => !!this.marker && !!this.map),
        startWith(null),
        pairwise(),
        map(([previous, current]) =>
          this.reducePointPath([previous, current as MovePointOption])
        )
      )
      .subscribe((current) => this.movePoint(current));

    return subject;
  }

  /** 创建一个历史线路 */

  createHistoryPolyline(
    map?: AMap.Map,
    path?: AMap.LngLatLike[],
    zIndex?: number
  ) {
    const polyline = new this.Map.Polyline({
      path,
      strokeColor: "#937DC2", //线颜色
      strokeWeight: 7, //线宽
      strokeOpacity: 1,
      zIndex: zIndex || 13,
      showDir: true,
      lineJoin: "round",
    });
    map && polyline.setMap(map);
    return polyline;
  }

  /**
   * 生成一个默认的小车icon
   * @returns
   */
  generateIcon() {
    var icon = new this.Map.Icon({
      size: new this.Map.Size(CAR_SIZE, CAR_SIZE), // 图标尺寸
      image: CAR_SRC, // Icon的图像
      imageOffset: new this.Map.Pixel(0, 0), // 图像相对展示区域的偏移量，适于雪碧图等
      imageSize: new this.Map.Size(CAR_SIZE, CAR_SIZE), // 根据所设置的大小拉伸或压缩图片
    });
    return icon;
  }

  /**
   * 在地图上添加一个用于移动的Marker
   *
   * @returns
   */
  addPoint() {
    const allowAdd = this.origin && this.map;

    if (!allowAdd) return;

    this.marker = new this.Marker({
      map: this.map,
      position: this.origin,
      icon: this.generateIcon(),
      // icon: "https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png",
      offset: new AMap.Pixel(-CAR_SIZE / 2, -CAR_SIZE / 2),
    });

    this.passedPolyline = this.createHistoryPolyline(this.map);

    this._movingSubscription = this._addMovingObservable();

    this._moveFinishedSubscription = this._addMoveFinishedObservable();
  }

  /**
   * 处理Point的移动path
   *
   * 处理了在上一个movealone没有结束前，又开始了新的移动请求的情况
   * TODO: 如果上一个路段没走完，速度要进行变化
   * @param pairwisePath 最近两个Point需要移动path
   * @returns 返回处理后的移动path
   */
  reducePointPath(pairwisePath: [MovePointOption | null, MovePointOption]) {
    const [previous, current] = pairwisePath;
    const util = new GeometryUtil(this.Map);
    if (this._isMoving && previous) {
      // 保存已经走过的记录
      this.marker?.stopMove();
      this.checkPassedHistory(this._movePassed);

      // 获取marker当前位置然后拼接新旧两段路径
      const nowPos = this.marker?.getPosition();
      if (nowPos) {
        const splitPath = util.closestOnPath(nowPos, previous.path, false, 0);
        if (splitPath.onLine && splitPath.afterPath) {
          // 补充没有移动结束的数据,
          // 补充到current的path中，在下一个新的坐标点来临时，current作为previous就不会有偏差
          current.path.unshift.apply(current.path, splitPath.afterPath);
        }
      }
      this._isMoving = false;
    }

    const customPath: MoveAlongObj[] = [
      {
        position: current.path[0],
        duration: 0,
      },
    ];
    // 生成动画移动队列
    for (let index = 1; index < current.path.length; index++) {
      const point = current.path[index];
      customPath.push({
        position: point,
        duration: util.distance(point, current.path[index - 1]) / current.speed,
      });
    }

    return customPath;
  }

  /**
   * Point 按照 Path 进行移动，每段动画持续 duration秒
   * @param path
   * @returns
   */
  movePoint(path: MoveAlongObj[]) {
    if (!this.marker) return;
    this._isMoving = true;

    const option = {
      // 每段动画的时长，就是从A - B的时间，B - C的时间，每两个点的时间
      // duration: durationMs, //可根据实际采集时间间隔设置
      // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
      autoRotation: true,
      // 每段完整动画间隔时长
      aniInterval: 0,
      // 延迟动画时长
      delay: 0,
    };
    // 设置移动路径
    this.marker.setExtData({
      moveAlongPath: path,
      ms: Date.now() / 1000,
    });
    this.marker.moveAlong(
      // note: 高德2.0的SDK如果传入 AMap.LngLat 第二次播放的时候会报错
      // @ts-ignore
      path,
      option
    );
  }

  /**
   * 添加point移动的observable
   * @returns
   */
  _addMovingObservable() {
    if (!this.marker) return;

    return fromEvent(this.marker, "moving")
      .pipe(
        tap((e) => {
          this._isMoving = true;
          this._movePassed = e.passedPath;
        }),
        throttleTime(0, animationFrameScheduler)
      )
      .subscribe((passed) => {
        this.passedPolyline?.setPath(passed.passedPath);
        if (this.map?._$setZoomAndCenter && this._moveFollow) {
          this.map?._$setZoomAndCenter({
            // 缩放等级交给上层控制，这里我只关心地图中心是否实时跟随
            center: passed.pos,
            immediately: false,
            duration: 300,
            type: 'center'
          });
        }
      });
  }
  /**
   * movealong动画停止回调
   * @returns
   */
  _addMoveFinishedObservable() {
    if (!this.marker) return;

    const moveFinishedObservable = fromEvent(this.marker, "movealong").pipe(
      map((e) => {
        return (this._movePassed = e.passedPath);
      })
    );
    return moveFinishedObservable.subscribe((passedPath) => {
      this.checkPassedHistory(passedPath);
      this._isMoving = false;
      this.marker?.setExtData({
        moveAlongPath: null,
      });
    });
  }

  setOrigin(lnglat: AMap.Vector2) {
    this.marker?.setPosition(lnglat);
  }

  /**
   *
   * 发起一次新的Point移动请求
   *
   * @param path 移动的经纬度路径
   * @param speed 移动的动画总的持续时间，单位秒
   * @returns
   */
  move(
    path: (AMap.LngLat | AMap.LngLatLike)[],
    speed: number,
    follow?: boolean
  ) {
    this._moveFollow = follow;
    this._moveSubject?.next({
      path,
      speed,
    });
  }

  /**
   * 检查经过的轨迹，应用到地图上
   */
  checkPassedHistory(passedPath?: AMap.LngLatLike[]) {
    if (passedPath) {
      this.passedHistory?.push(
        this.createHistoryPolyline(this.map, passedPath)
      );
    }
  }

  destroy() {
    // console.warn('MovePoint Destory');

    this._moveFinishedSubscription?.unsubscribe();
    this._movingSubscription?.unsubscribe();

    if (this.marker) {
      this.map?.remove(this.marker);
      this.marker?.stopMove();
      this.marker?.remove();
    }

    this.map?.remove(this.passedHistory);
    this.passedHistory.forEach((e) => e.destroy());
    this.passedPolyline && this.map?.remove(this.passedPolyline);
    this.passedPolyline?.destroy();

    this._moveSubject?.complete();
    this._moveSubject?.unsubscribe();
    // this._moveSubject = null;
  }

  /**
   * 尝试进行偏航点历史补齐
   *
   * @param point
   * @returns
   */
  getGraspRoad(point?: AMap.LngLatLike) {
    this.marker?.stopMove();
    this._isMoving = false;

    const { moveAlongPath, ms } = this.marker?.getExtData() || {};
    const toGraspPoint = function (point: AMap.LngLatLike, tm: number) {
      const vector = toVector2(point);
      return {
        x: vector[0],
        y: vector[1],
        sp: 0,
        ag: 0,
        tm: tm,
      };
    };
    const originPath = moveAlongPath.map(
      (point: AMap.LngLatLike, index: number) => {
        return toGraspPoint(point, index === 0 ? ms : 10);
      }
    );

    if (point) {
      originPath.push(toGraspPoint(point, 10));
    }

    // FIXME: 纠偏之后线路如果异常，需要进行丢弃或者补充，不然会有异常线路的存在
    return graspRoad(originPath).pipe(retry(2));
  }

  /**
   * 偏航补充历史轨迹
   */
  leewayCorrect(point?: AMap.Vector2, path?: AMap.LngLatLike[]) {
    // console.log("leewayCorrect");
    const historyIndex = 9;

    this.marker?.stopMove();
    this._isMoving = false;

    // 用当前移动的历史轨迹，加上point 进行纠偏
    point && this.marker?.setPosition(point);

    // 降低层级
    this.passedHistory.forEach((polyline) => {
      polyline.setOptions({
        zIndex: historyIndex,
      });
    });
    // 添加当前历史
    path &&
      this.passedHistory.push(
        this.createHistoryPolyline(this.map, path, historyIndex)
      );
  }
}
