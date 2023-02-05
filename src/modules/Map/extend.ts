import {
  animationFrameScheduler,
  concatMap,
  filter,
  fromEvent,
  map,
  merge,
  mergeMap,
  Observable,
  retry,
  skipUntil,
  skipWhile,
  Subject,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
  throttleTime,
} from "rxjs";
import Route, { RouteOption } from "../Route";
import { getTmcsMultLinePath } from "../Route/helper";
import { rxDriving, TmcsPaths, toVector2 } from "./toolkit";

export const MapPool: Record<string, AMap.Map | null> = Object.create(null);
export const RoutePool: Record<string, Route | null> = Object.create(null);

/**
 * 销毁Map和Route对象
 * @param mapId
 */
export function destroyForMapId(mapId: string) {
  console.warn("destroy mapContainer: ", mapId);
  RoutePool[mapId]?.destroy();
  RoutePool[mapId] = null;

  MapPool[mapId]?.destroy();
  MapPool[mapId] = null;
}

/**
 * TODO: 考虑异步的情况
 * @param mapId
 * @returns
 */
export function getMapVm(mapId: string) {
  return MapPool[mapId];
}

interface DrawLineOption extends RouteOption {
  line: TmcsPaths[];
  mapVm?: AMap.Map;
  MapConstructor: typeof AMap;
  point?: AMap.Vector2;
}

function drawLine(option: DrawLineOption) {
  const { line, mapVm, MapConstructor, point, debug } = option;
  const route = new Route(
    {
      tcmsPath: line,
      point: point, // 非线上的点
      map: mapVm,
      debug,
    },
    MapConstructor
  );
  route.draw();

  return route;
}

/**
 * 通过高德JS SDK内置路径规划，查询出发地到目的地的导航线路
 *
 * @param origin 出发地
 * @param destination 目的地
 * @returns
 */
export function defaultGetPath(
  origin: AMap.LngLatLike,
  destination: AMap.Vector2
) {
  return rxDriving(toVector2(origin), destination).pipe(
    retry(2),
    map(getTmcsMultLinePath)
  );
}

interface DrawPathBetweenOption extends RouteOption {
  /** 起点经纬度 */
  origin: AMap.Vector2;
  /** 终点经纬度 */
  destination: AMap.Vector2;
  /** 在线上显示的点经纬度 */
  point?: AMap.Vector2;
  /** map 容器 id */
  mapId: string;
  /** 是否需要在地图上绘制 */
  isDraw?: boolean;
}
/**
 * 创建出发地到目的地的导航路径
 * @param option
 * @returns  Route 实例
 */
export function getRoute(option: DrawPathBetweenOption): Observable<Route> {
  const { origin, destination, mapId, isDraw, point } = option;
  const mapVm = getMapVm(mapId);
  const createdRoute = RoutePool[mapId];

  // 确保一个Map容器只有一条Route
  if (createdRoute instanceof Route) {
    console.warn(`map route id=${mapId} has already existing`);
    createdRoute.destroy();
  }
  // 无效容器id
  if (!mapVm) {
    throw new Error(
      `getRoute必须等ID=${mapId}的地图实例初始完毕后才可以获取并渲染`
    );
  }
  return defaultGetPath(origin, destination).pipe(
    // tap(console.log),
    map((line: TmcsPaths[]): DrawLineOption => {
      return {
        line: line,
        MapConstructor: AMap, // FIXME: 这个AMap不能固定写死
        mapVm: isDraw && mapVm ? mapVm : undefined,
        point: point,
        debug: option.debug,
      };
    }),
    map((option) => {
      const rt = drawLine(option);
      RoutePool[mapId] = rt;
      return rt;
    })
  );
}

interface ZoomAndCenterControllOption {
  mapvm: AMap.Map;
}
export interface ZCOption {
  zoom?: number;
  center?: AMap.Vector2;
  immediately: boolean;
  /** 动画持续时间， immediately = true 时生效*/
  duration?: number;
  /** 变化类型 */
  type?: "zoom" | "center" | "all";
}

let zoomAndCenterCtrlSub: Subject<ZCOption>;

/**
 * 初始化地图缩放和中心点移动控制器，
 * 涉及到多异步输入流的情况下，
 * 优先使用 mapvm._$setZoomAndCenter 方法
 * @param option
 * @returns
 */
export function initZoomAndCenterControll(option: ZoomAndCenterControllOption) {
  let operateTime: number = 0;
  let changing = false;
  const { mapvm } = option;
  const coolingTime = 2000;
  const startEvents = merge(
    fromEvent(mapvm, "dragstart"),
    fromEvent(mapvm, "zoomstart"),
    fromEvent(mapvm, "rotatestart")
  );
  const endEvents = merge(
    fromEvent(mapvm, "dragend"),
    fromEvent(mapvm, "zoomend"),
    fromEvent(mapvm, "rotateend")
  );
  const mapStartEventSub = startEvents
    .pipe(
      tap(() => (changing = true)),
      concatMap(() => endEvents)
    )
    .subscribe(() => {
      operateTime = Date.now();
      changing = false;
    });

  zoomAndCenterCtrlSub = new Subject<ZCOption>();

  mapvm._$setZoomAndCenter = function (option: ZCOption) {
    // console.warn('zoomAndCenterCtrlSub');
    zoomAndCenterCtrlSub.next(option);
  };

  zoomAndCenterCtrlSub
    .pipe(
      filter((param: ZCOption) => {
        const now = Date.now();
        const diff = now - operateTime;
        const validType = !!param.type;
        return validType && !changing && diff >= coolingTime;
      }),
      throttleTime(0, animationFrameScheduler)
    )
    .subscribe((param: ZCOption) => {
      const { center, zoom, immediately, duration, type } = param;

      switch (type) {
        case "zoom":
          zoom && mapvm.setZoom(zoom, immediately, duration);
          break;
        case "center":
          center && mapvm.setCenter(center, immediately, duration);
          break;
        case 'all':
          zoom && center && mapvm.setZoomAndCenter(zoom, center, immediately, duration);
          break;
        default:
          console.error('no defined zoom ctrl type: ', type);
          break;
      }
    });

  return function unsubscribeZoomAndCenterControll() {
    console.warn("unsubscribeZoomAndCenterControll");
    mapStartEventSub.unsubscribe();
    zoomAndCenterCtrlSub.unsubscribe();
  };
}
