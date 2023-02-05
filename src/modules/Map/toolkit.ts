import AMapLoader from "@amap/amap-jsapi-loader";
import { defer, from, Observable, retry } from "rxjs";
import aMapConfig from "./config";
export function loadScript() {
  window._AMapSecurityConfig = {
    securityJsCode: aMapConfig.securityJsCode,
  };
  return AMapLoader.load({
    key: aMapConfig.key, // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.Driving", "AMap.MoveAnimation", "AMap.GraspRoad"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  });
}

export function rxLoadScript(): Observable<typeof AMap> {
  return defer(() => from(loadScript())).pipe(retry(2));
}

export function toVector2(latlng: AMap.LngLatLike): AMap.Vector2 {
  const isLngLat = latlng instanceof AMap.LngLat;
  let lng = isLngLat ? latlng.getLng() : latlng[0],
    lat = isLngLat ? latlng.getLat() : latlng[1];
  return [lng, lat];
}

export interface TmcsPaths {
  distance: number;
  path: AMap.LngLatLike[];
  status: "通畅" | "缓行" | "拥堵" | "严重拥堵" | "未知";
}

export interface DrivingStep {
  /** 描述文案 */
  instruction: string;
  /** 方向 */
  orientation: string;
  /** 路名 */
  road: string;
  /** 距离 */
  distance: number;
  tmcsPaths: TmcsPaths[];
}

interface DrivingRoute {
  /** 距离 */
  distance: number;
  /** 时间 */
  duration: number;
  /** 限行 */
  restriction: number;
  /** 导航政策 */
  policy: string;
  /** 导航阶段Step */
  steps: DrivingStep[];
  toll_distance: number;
  tolls: number;
}
export interface DrivingResult {
  start: {
    location: AMap.LngLat;
    name: "起点";
    type: "start";
  };
  end: {
    location: AMap.LngLat;
    name: "终点";
    type: "end";
  };
  origin: AMap.LngLat;
  destination: AMap.LngLat;
  routes: DrivingRoute[];
}

export function rxDriving(
  origin: AMap.Vector2,
  destination: AMap.Vector2,
  map?: AMap.Map
): Observable<DrivingResult> {
  return new Observable((subscriber) => {
    const sub = rxLoadScript().subscribe((AMap) => {
      // @ts-ignore
      var driving = new AMap.Driving({
        // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
        // @ts-ignore
        policy: AMap.DrivingPolicy.LEAST_TIME,
        map,
        // autoFitView: true,
      });

      // var startLngLat = [116.151823,40.058613];
      var startLngLat = origin; //[116.094937, 39.990529];

      var endLngLat = destination; // [116.17856,39.993053];

      // 北京南站
      // var startLngLat = [116.379311,39.865562] || [116.379028, 39.865042]
      // var endLngLat = [116.427281, 39.903719]

      driving.search(
        startLngLat,
        endLngLat,
        function (status: string, result: DrivingResult) {
          switch (status) {
            case "complete":
              subscriber.next(result);
              break;
            case "error":
              subscriber.error(result);
              break;
            case "no_data":
              subscriber.error(result);
          }
          subscriber.complete();
          sub.unsubscribe();
        }
      );
    });
  });
}

interface GraspRoadResponse {
  data: {
    /** 纠偏后的轨迹 */
    points: { x: number; y: number }[];
    /**里程 */
    distance: number;
  };
}
interface GraspRoadPath {
  x: number;
  y: number;
  sp: number;
  ag: number;
  tm: number;
}

/**
 * 轨迹纠偏服务插件。
 * 用于将一组带方向的、可能偏离道路的经纬度轨迹，纠正为准确沿着道路的一条经纬度路径。
 *
 * 比如将一组间隔采集的车辆位置和朝向、速度、时间等信息传入，
 * 可以得到一组沿着道路行进的经纬度路径和总的行驶历程。
 *
 * @param originPath 纠偏之前需要按照下面的数据规格准备原始轨迹点，x、y、sp、ag、tm分别代表经度、纬度、速度、角度、时间。
 * @returns
 */
export function graspRoad(
  originPath: GraspRoadPath[]
): Observable<AMap.Vector2[]> {
  return new Observable((subscriber) => {
    rxLoadScript().subscribe({
      next(AMap) {
        // @ts-ignore
        const grasp = new AMap.GraspRoad();
        grasp.driving(originPath, (error: any, rsp: GraspRoadResponse) => {
          if (!error) {
            const newPath = rsp.data.points; //纠偏后的轨迹
            subscriber.next(newPath.map((p) => [p.x, p.y]) as AMap.Vector2[]);
          } else {
            subscriber.error(error);
          }
          subscriber.complete();
        });
      },
    });
  });
}

/**
 * 随机生成字符串id
 * @param length 生成的字符串长度
 * @returns
 */
export function randomAlphaNumeric(length: number) {
  let s = "";
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
}
