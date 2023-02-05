import { toVector2 } from "../Map/toolkit";
import { GeometryUtil as Util } from "./GeometryUtil";
export interface onLineResult {
  splitIndex: number | undefined;
  multiIndex: number | undefined;
  afterPath: AMap.LngLatLike[] | undefined;
  onLine: boolean | undefined;
  beforePath: AMap.LngLatLike[] | undefined;
  closestPoint?: AMap.LngLatLike;
}

export default class GeometryUtil {
  /** 高德地图构造函数 */
  // util: typeof AMap.GeometryUtil;
  util: typeof Util;
  // LngLat: typeof AMap.LngLat;

  constructor(Map: any) {
    if (!Map) throw new Error("AMap constructor must provide");
    // this.util = Map.GeometryUtil;
    this.util = Util;
    // this.LngLat = Map.LngLat;
  }

  /**
   * 在path上寻找最近的点
   */
  closestOnPath(
    point: AMap.LngLatLike,
    path: (AMap.LngLatLike[] | AMap.LngLatLike)[],
    multi?: boolean,
    tolerance?: number
  ): onLineResult {
    let onLine = false,
      multiIndex = -1;
    let closestPoint: AMap.LngLatLike | undefined;
    let beforePath: AMap.LngLatLike[] = [];
    let afterPath: AMap.LngLatLike[] = [];
    let splitIndex = -1;
    let targetPath: AMap.LngLatLike[] = [];
    const beforeMulti: AMap.LngLatLike[] = [];

    tolerance = tolerance != null ? tolerance : 10;

    if (multi) {
      // 多路径判断
      for (const step of path) {
        ++multiIndex;
        const stepOnLine = this.util.isPointOnLine(
          point,
          step as AMap.LngLatLike[],
          tolerance
        );

        if (stepOnLine) {
          onLine = true;
          break;
        } else {
        }

        beforeMulti.push.apply(beforeMulti, step as AMap.LngLatLike[]);
      }
      if (onLine) {
        targetPath = path[multiIndex] as AMap.LngLatLike[];
      }
    } else {
      targetPath = path as AMap.LngLatLike[];
      // 单路径判断是否在线上
      onLine = this.util.isPointOnLine(
        point,
        path as AMap.LngLatLike[],
        tolerance
      );
    }

    // 寻找line上距离pint最近的点
    if (onLine) {
      const closestSegment = this.util.closestSegmentOnLine(point, targetPath);
      const segment = closestSegment.segment;

      closestPoint = closestSegment.point;

      if (segment) {
        splitIndex = 1; // Math.max(closestIndex.beforeIndex, closestIndex.afterIndex);

        // 处理 beforeMulti 前面的路径
        beforePath.push.apply(beforePath, beforeMulti);
        // 处理当前路段的分割
        beforePath.push(...targetPath.slice(0, segment[0] + 1), closestPoint);
        // 处理后面要运行的路段
        afterPath.push(closestPoint, ...targetPath.slice(segment[1]));
      }
    }

    return {
      onLine: onLine,
      closestPoint: closestPoint,
      beforePath,
      afterPath,
      multiIndex,
      splitIndex,
    };
  }

  /**
   * 计算经纬度之间的角度
   *
   * @param prev 前一个点
   * @param current 当前点
   * @returns
   */
  getAngle(prev: AMap.Vector2, current: AMap.Vector2) {
    const angle = Util.getAngle(prev, current);
    return angle ? angle : 0;
  }

  /**
   * 获取该路段的行驶速度
   * @param path 路径
   * @param duration 路段的行驶时间（ms）
   * @returns 速度（米/毫秒）
   */
  getSpeedTime(path: AMap.LngLatLike[], duration: number) {
    const distance = Util.distanceOfLine(path.map((point) => toVector2(point)));
    // console.warn(distance, duration, distance/duration);
    /** 速度 米/毫秒 */
    const speed =  distance/duration

    return speed
  }

  /**
   * 计算点A-点B的直线距离
   * @param p1 点A
   * @param p2 点B
   * @returns 距离 number
   */
  distance(p1: AMap.LngLatLike, p2: AMap.LngLatLike) {
    return Util.distance(p1, p2)
  }
}
