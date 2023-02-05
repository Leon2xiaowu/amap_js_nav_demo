import {
  concatMap,
  delay,
  EMPTY,
  filter,
  iif,
  map,
  Observable,
  of,
  retry,
  scan,
  Subscriber,
  tap,
  timer,
  zip,
} from "rxjs";
import GeometryUtil, { onLineResult } from "../GeometryUtil";
import { rxDriving, TmcsPaths, toVector2 } from "../Map/toolkit";
import MovePoint from "./MovePoint";

interface RoutePath {
  /** 分段线路数组 */
  path?: AMap.LngLatLike[];
  /** 附带交通态势的path */
  tcmsPath?: TmcsPaths[];
  /** 历史轨迹 */
  history?: AMap.LngLatLike[];
}
export interface RouteOption extends RoutePath {
  /** 偏航自动调整 */
  refreshWhemYaw?: boolean;
  /** 显示行驶过的尾巴 */
  showTail?: boolean;
  /** 需要在线上呈现的点 P  */
  point?: AMap.LngLatLike;
  /** 线上点 P 的误差距离 */
  tolerance?: number;
  /** 地图实例 */
  map?: AMap.Map;
  /** 是否开启调试模式 */
  debug?: boolean;
}

interface GetGraspOption {
  autoGrasp?: boolean;
  getGraspPath?: (point: AMap.LngLatLike) => Observable<TmcsPaths[]>;
  /** 是否开启地图中心点跟随移动 */
  follow?: boolean;
}

/** 默认判断点P是否在线上的误差 */
const DEFAULT_TOLERANCE = 50;

export default class Route {
  _option: RouteOption;
  /** 高德地图 new AMap 实例 */
  map?: AMap.Map;
  /** 线路 */
  path?: AMap.LngLatLike[];
  /** 附带交通态势的path */
  tcmsPath?: TmcsPaths[];
  /** geo工具类，目前支持高德 */
  geoUtil: GeometryUtil;
  /** 当前显示的点 P 经纬度点 */
  point: MovePoint;
  /** 线上点 P 的误差距离 */
  tolerance: number = DEFAULT_TOLERANCE;
  /** 移动过的点 P 经纬度点 */
  movedPoints: AMap.LngLatLike[];
  /** 地图sdk类 */
  Map: typeof AMap;
  polyline?: AMap.Polyline[];

  _preRefreshSubscriber?: Subscriber<any> | null;
  /** 调试after的轨迹 */
  _debugLine?: AMap.Polyline;

  /**
   * 创建一个线路类
   *
   * @param option 配置项
   * @param map 地图构造函数
   */
  constructor(option: RouteOption, Map: typeof AMap) {
    this._option = option;
    this.path = option.path;
    this.movedPoints = [];
    this.point = new MovePoint(
      {
        origin: option.point,
        map: option.map,
      },
      Map
    );
    this.tcmsPath = option.tcmsPath;
    this.tolerance = option.tolerance || DEFAULT_TOLERANCE;
    this.geoUtil = new GeometryUtil(Map);
    this.Map = Map;
    this.map = option.map;

    // this.getLinePoint();
  }

  checkPath() {
    if (!this.path) throw new Error("绘制线路不能为空");
  }

  /**
   * 新建一个Polyline
   * @param part 线条段
   * @param options 配置项
   * @returns Polyline
   */
  private _generatePolyline(
    part: AMap.LngLatLike[] | TmcsPaths | AMap.LngLatLike[][],
    options?: Partial<AMap.PolylineOptions>
  ) {
    const isSolPath = Array.isArray(part);
    const path = isSolPath ? part : part.path;

    const tcmsColor: { [key: string]: string } = {
      通畅: "#3D8361",
      缓行: "#FECD70",
      拥堵: "#E94560",
      严重拥堵: "#42032C",
      未知: "#B7C4CF",
    };
    const strokeColor = isSolPath
      ? "#3D8361"
      : tcmsColor[part.status] || "#3D8361";

    options = options || {};
    return new this.Map.Polyline({
      path: path,
      strokeColor,
      strokeWeight: 7,
      strokeOpacity: 1,
      showDir: false,
      lineJoin: "round",
      zIndex: 10,
      ...options,
    });
  }

  /**
   * 计算一组经纬度线段的角度
   * @param path 经纬度线段
   * @returns 经纬度方向的旋转角度
   */
  getOrientationByPath(path: AMap.LngLatLike[]) {
    const beginPoint = toVector2(path[0]);
    const endPoint = toVector2(path[1]);
    const angle = this.geoUtil.getAngle(beginPoint, endPoint);

    // if debug
    // this.debugPointMarker(beginPoint)
    // this.debugPointMarker(endPoint)

    return angle;
  }

  /**
   * 生成单条线段
   * @param path 经纬度线段
   * @returns 反馈Polyline数组和线路的初始角度
   */
  private _generateSinglePolyline(path: AMap.LngLatLike[]) {
    return {
      polyline: [this._generatePolyline(path)],
      initAngle: this.getOrientationByPath(path),
    };
  }

  /**
   * 生成彩虹线段
   * @param tcmsPath 经纬度线段
   * @returns 反馈Polyline数组和线路的初始角度
   */
  private _generateTcmsPolyline(tcmsPath: TmcsPaths[]) {
    const arrowsPolyline: AMap.LngLatLike[] = [];
    const path = this.refinePolylineWithPoint(tcmsPath);
    // 轨迹线段
    const polyline = path.reduce((lines: AMap.Polyline[], part) => {
      lines.push(this._generatePolyline(part));
      arrowsPolyline.push(...part.path);
      return lines;
    }, []);
    // 绘制箭头线段
    polyline.push(
      this._generatePolyline(arrowsPolyline, {
        strokeOpacity: 0,
        showDir: true,
        zIndex: 11,
        strokeWeight: 6,
      })
    );

    return {
      polyline,
      initAngle: this.getOrientationByPath(tcmsPath[0].path),
    };
  }

  /**
   * 根据实例中的`path`或者`tcmsPath`绘制线路
   */
  draw() {
    let polyline;
    if (this.path || this.tcmsPath) {
      const lines = this.path
        ? this._generateSinglePolyline(this.path)
        : this.tcmsPath && this._generateTcmsPolyline(this.tcmsPath);

      if (lines) {
        polyline = lines.polyline;
        // 计算point的初始角度
        this.point.marker?.setAngle(lines.initAngle);
      }
    } else {
      throw new Error("绘制线路不能为空");
    }

    // 1. 起点和第一个轨迹点的连线是插件自己补充的，如果起点不在第一个轨迹点上，补充直线虚线
    // 2. 颜色，内部道路

    if (this.map && polyline) {
      this.destroyPolyline();
      this.polyline = polyline;
      this.map.add(polyline);
      this.fitZoom();
    }
  }

  /**
   * 将point.origin补充进线路中
   *
   * @param paths
   * @returns
   */
  refinePolylineWithPoint(paths: TmcsPaths[]) {
    const origin = this.point.origin;

    if (origin) {
      const refine = this.getLinePoint(origin, paths, true);
      // 找到point在线上的位置
      if (refine && refine.splitIndex !== -1 && refine.afterPath) {
        paths.splice(0, refine.multiIndex);
        paths[0].path = refine.afterPath;
        refine.closestPoint &&
          this.point.setOrigin(refine.closestPoint as AMap.Vector2);
        // this.point.setOrigin(refine.closestPoint)
      }
    }

    return paths;
  }

  /**
   * 计算 point 是否在线上
   * @param point 新的Point位置
   */
  public isOnLineFor(point: AMap.LngLatLike) {
    // 1. 找到目标点在线段上的位置
    const { onLine, beforePath, multiIndex, afterPath, closestPoint } =
      this.getLinePoint(point, this.tcmsPath, true) || {};

    if (this._option.debug) {
      afterPath && this.debugGetLinePoint([...afterPath]);
    }

    if (onLine && this.tcmsPath) {
      if (multiIndex) {
        this.tcmsPath.splice(0, multiIndex);
      }
      afterPath && (this.tcmsPath[0].path = [...afterPath]);
    }

    return {
      onLine,
      beforePath,
      point,
      closestPoint,
    };
  }

  /**
   * 更新Point位置
   * @param beforePath
   * @param interval  path 的行驶时间，如果传入会根据持续时间计算移动速度
   */
  public movePointOnLine(
    beforePath: AMap.LngLatLike[] | undefined,
    interval?: number,
    follow?: boolean
  ) {
    // if (splitIndex !== -1 && this.tcmsPath) {
    //   this.tcmsPath.splice(0, multiIndex);
    //   this.tcmsPath[0].path = afterPath;
    //   // this.point.setOrigin(refine.closestPoint)
    // }

    if (beforePath) {
      const speed = this.geoUtil.getSpeedTime(beforePath, interval || 2000);
      // 上一个更新点与最新点的距离 / 间隔时间 = 速度d
      // 当前移动点与最新点的距离 / 速度d = 总共剩余需要运动的时间
      // 也可以调整为每一段经纬度的距离 / 速度d = 当前路段需要运动的时间
      // 可以再配合一个加速度系数x,减少延迟率
      this.point.move(beforePath, speed, follow);
    }
  }

  private fitZoom(overlays?: AMap.OverlayGroup[]) {
    if (!this.map) return;

    overlays = overlays || this.map.getAllOverlays();

    const [zoom, center] =
      this.map.getFitZoomAndCenterByOverlays(overlays, [20, 20, 20, 20]) || [];
    this.map.setZoomAndCenter(zoom, center, true);
  }

  /**
   * 把点钉在线上
   */
  private getLinePoint(
    point: AMap.LngLatLike,
    path?: TmcsPaths[],
    multi?: boolean
  ): onLineResult | undefined {
    if (!point || !path) return;
    const tolerance = 10;
    const calcPath = path.map((step) => step.path);
    const result = this.geoUtil.closestOnPath(
      point,
      calcPath,
      multi,
      tolerance
    );
    return result;
  }

  /**
   * 调试用户计算的待行驶路径
   *
   * @param path
   * @param strokeColor
   */
  debugGetLinePoint(
    path: AMap.LngLatLike[][] | AMap.LngLatLike[],
    strokeColor?: string
  ) {
    const defaultColor = "#DD5353";
    if (this._debugLine) {
      this._debugLine.setPath(path);
      strokeColor &&
        this._debugLine.setOptions({
          strokeColor: strokeColor || defaultColor,
        });
    } else {
      this._debugLine = this._generatePolyline(path, {
        strokeOpacity: 1,
        showDir: false,
        zIndex: 20,
        strokeWeight: 4,
        strokeColor: strokeColor || defaultColor,
      });
      this.map?.add(this._debugLine);
    }
  }

  /**
   * 销毁对象，释放内存
   */
  destroy() {
    // console.warn('Route Destory');
    this.point.destroy();
    this.destroyPolyline();
  }

  private destroyPolyline() {
    if (!this.polyline) return;

    this.map?.remove(this.polyline);
    this.polyline.forEach((line) => {
      line.destroy();
    });
  }

  preRefresh(): Observable<void> {
    const self = this;
    return new Observable(function subscribe(subscriber) {
      self._preRefreshSubscriber = subscriber;
      // Provide a way of canceling and disposing the interval resource
      return () => {
        subscriber.complete();
        self._preRefreshSubscriber = null;
      };
    });
  }

  refresh(routePath: RoutePath, point: AMap.Vector2) {
    const { path, tcmsPath, history } = routePath;
    if (path) {
      this.path = path;
    }
    if (tcmsPath) {
      this.tcmsPath = tcmsPath;
    }
    this.draw();
    this.point.leewayCorrect(point, history);
  }

  private getGraspObservable(point: AMap.LngLatLike, opt: GetGraspOption) {
    const { getGraspPath, autoGrasp } = opt;
    if (autoGrasp && typeof getGraspPath === "function") {
      // FIXME: 这里要修改偏航处理逻辑
      // 应该分两部分
      // 1. 判定偏航逻辑细化
      // 2. 判定偏航后，根据历史+偏航点连接历史线路
      // 3. 根据最新点和目的地规划新的线路
      return zip(getGraspPath(point), this.point.getGraspRoad(point));
    }
    return EMPTY;
  }

  /** 添加调试的point marker 点 */
  private debugPointMarker(closestPoint: AMap.LngLatLike) {
    if (this._option.debug) {
      new this.Map.Marker({
        map: this.map,
        position: toVector2(closestPoint),
      });
    }
  }

  updatePathPoint(
    point: {
      interval: number;
      location: AMap.LngLatLike;
    },
    opt: GetGraspOption
  ) {
    const result = this.isOnLineFor(point.location);
    const { getGraspPath, autoGrasp } = opt;
    /**
     * 调试-在地图上打印Marker点
     * @param onLineResult
     */
    const debugPoint = (onLineResult: typeof result) => {
      if (onLineResult.closestPoint) {
        this.debugPointMarker(onLineResult.closestPoint);
      }
    };
    /** 在已规划的路线上移动marker点至目标点 */
    const move2PointOnLine = (pointResult: {
      history?: AMap.LngLatLike[];
      point?: AMap.LngLatLike;
      /** 更新间隔时间 */
      interval?: number;
      follow?: boolean;
    }) => {
      this.movePointOnLine(
        pointResult.history,
        pointResult.interval,
        pointResult.follow
      );
    };

    return iif(
      () => !!result.onLine,
      of(result).pipe(
        tap(debugPoint),
        map((result) => ({
          history: result.beforePath,
          point: result.closestPoint,
          interval: point.interval,
          follow: opt.follow,
        })),
        tap(move2PointOnLine)
      ),
      of(result).pipe(
        filter(() => !!(autoGrasp && typeof getGraspPath === "function")),
        concatMap((result) => this.getGraspObservable(result.point, opt)),
        // delay(1000),
        // tap(([newPath, history]) => {
        //   // debugger
        //   route.tcmsPath = newPath
        // }),
        map(([newPath, history]) => {
          return {
            history,
            newPath,
            point: result.point,
          };
        }),
        tap((pointResult) => {
          if (pointResult.newPath) {
            this.refresh(
              {
                tcmsPath: pointResult.newPath,
                history: pointResult.history,
              },
              pointResult.point as AMap.Vector2
            );
          }
        })
      )
    );
  }
}
