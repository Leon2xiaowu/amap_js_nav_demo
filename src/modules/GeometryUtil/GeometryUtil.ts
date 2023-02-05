// @ts-nocheck

import { ProjectionManager } from "./Projection";
import { Coordinate } from "./Coordinate";
import { Pixel } from "./Pixel";
import { getCrsProjection } from "./Projection";


const zoomRange = [2, 26];
const options = {
  onSegmentTolerance: 5,
  crs: "EPSG3857",
  maxZoom: zoomRange[1],
};
const Const = { vr: Math.PI / 180, mr: 180 / Math.PI, yr: 6378137 };

type LngLatArray = [number, number];

class LngLat$2 {
  lat: number;
  lng: number;

  constructor(lng: number, lat: number) {
    this.lat = lat;
    this.lng = lng;
  }
}
/**
 * 转化经纬度数据到统一格式
 *
 * @param t
 * @returns
 */
function parseLngLatData(
  t: LngLat$2 | LngLatArray | (LngLatArray | LngLat$2)[]
) {
  if (Array.isArray(t)) {
    if (!Array.isArray(t[0])) {
      const lnglat = t as LngLatArray;
      var e = typeof t[0];
      return "string" == e || "number" == e
        ? new LngLat$2(lnglat[0] || lnglat.lng, lnglat[1] || lnglat.lat)
        : t;
    }
    for (var r = 0; r < t.length; r += 1) {
      // @ts-ignore
      t[r] = parseLngLatData(t[r]);
    }
  }
  return t;
}
function isClockwise(t: [number, number][]) {
  for (var e = 0, r = t.length, n = 0; n < r - 1; n++) {
    var i,
      a = t[n];
    e += ((i = t[n + 1])[0] - a[0]) * (i[1] + a[1]);
  }
  return (
    (t[r - 1][0] === t[0][0] && t[r - 1][1] === t[0][1]) ||
      ((a = t[r - 1]), (e += ((i = t[0])[0] - a[0]) * (i[1] + a[1]))),
    0 < e
  );
}
/**
 * 获取球面计算系统
 */
function getSphericalCrs(t: string, e: number) {
  var r = (function (t) {
    switch (t) {
      case "EPSG3857":
        return ProjectionManager.getProjection("EPSG:3857");
      case "EPSG4326":
        return ProjectionManager.getProjection("EPSG:4326");
    }
    return ProjectionManager.getProjection("EPSG3857");
  })(t);
  return {
    /**
     * 经纬度转像素坐标
     * @param t
     * @returns
     */
    project: function (t: AMap.LngLatLike | LngLat$2) {
      return (
        Array.isArray(t) && (t = new LngLat$2(t[0], t[1])),
        r.project(t.lng, t.lat)
      );
    },
    /**
     *
     * @param t
     * @returns
     */
    unproject: function (t) {
      // console.warn(t, 'Pixel.unproject');
      return (
        Array.isArray(t) && (t = new Pixel(t[0], t[1])), r.unproject(t.x, t.y)
      );
    },
    normalizePoint: function (t: AMap.LngLatLike) {
      return parseLngLatData(t);
    },
    distance: function (t, e) {
      if (((e = this.normalizePoint(e)), Array.isArray(e)))
        return this.distanceToLine(t, e);
      t = this.normalizePoint(t);
      var r = Const.vr,
        n = Math.cos,
        i = t.lat * r,
        a = t.lng * r,
        t = e.lat * r,
        e = e.lng * r,
        r = 2 * Const.yr,
        a = e - a,
        t = (1 - n(t - i) + (1 - n(a)) * n(i) * n(t)) / 2;
      return r * Math.asin(Math.sqrt(t));
    },
    ringArea: function (t) {
      t = this.normalizeLine(t);
      var e = Const.yr * Const.vr,
        r = 0,
        n = t,
        i = n.length;
      if (i < 3) return 0;
      for (var a = 0; a < i - 1; a += 1) {
        var o = n[a],
          s = n[a + 1],
          u = o.lng * e * Math.cos(o.lat * Const.vr),
          c = o.lat * e,
          o = s.lng * e * Math.cos(s.lat * Const.vr);
        r += u * (s.lat * e) - o * c;
      }
      var f = n[a],
        l = n[0],
        h = f.lng * e * Math.cos(f.lat * Const.vr),
        t = f.lat * e,
        f = l.lng * e * Math.cos(l.lat * Const.vr);
      return (r += h * (l.lat * e) - f * t), 0.5 * Math.abs(r);
    },
    sphericalCalotteArea: function (t) {
      var e = Const.yr,
        t = e - e * Math.cos(t / e);
      return 2 * Math.PI * e * t;
    },
  };
}

export class GeometryUtilCls {
  _opts: typeof options;

  distance: (p1: AMap.LngLatLike, p2: AMap.LngLatLike) => number;

  constructor() {
    this._opts = options;
    this.setCrs(this._opts.crs);
  }

  setCrs(crstype: string) {
    // TODO: 平面计算系统之后考虑
    // "plane" === crs ? getPlanarCrs() : getSphericalCrs(crs, this._opts.maxZoom);
    const crs = getSphericalCrs(crstype, this._opts.maxZoom);
    Object.assign(this, crs);
  }

  normalizePoint(t: any) {
    // 这是作为兜底，正常应该执行 getSphericalCrs 后的 normalizePoint
    return t;
  }
  normalizeLine(t: AMap.LngLatLike[]) {
    for (var e = [], r = 0, n = t.length; r < n; r++)
      e.push(this.normalizePoint(t[r]));
    return e;
  }

  isPointOnLine(t: AMap.LngLatLike, e: AMap.LngLatLike[], r: number) {
    for (var n = 0, i = (e = this.normalizeLine(e)).length; n < i - 1; n++)
      if (this.isPointOnSegment(t, e[n], e[n + 1], r)) return !0;
    return !1;
  }
  /**
   * 判断P1是否在P2P3上，tolerance为误差范围
   * @param t P1
   * @param e P2
   * @param r P3
   * @param n tolerance 误差
   * @returns
   */
  isPointOnSegment(
    t: AMap.LngLatLike,
    e: AMap.LngLatLike,
    r: AMap.LngLatLike,
    n: number
  ) {
    return (
      ((!n && 0 !== n) || n < 0) && (n = this._opts.onSegmentTolerance),
      this.distanceToSegment(t, e, r) <= n
    );
  }
  /**
   * 计算P2P3到P1的距离。单位：米
   * @param t P1
   * @param e P2
   * @param r P3
   * @returns
   */
  distanceToSegment(
    t: AMap.LngLatLike,
    e: AMap.LngLatLike,
    r: AMap.LngLatLike
  ) {
    return this.distanceToLine(t, [e, r]);
  }
  /**
   * 计算P到line的距离。单位：米
   * @param t P
   * @param e line
   * @returns
   */
  distanceToLine(t: AMap.LngLatLike, e: AMap.LngLatLike[]) {
    e = this.normalizeLine(e);
    // @ts-ignore
    e = this.isPoint(e[0]) ? e : e[0];

    for (var r = 1 / 0, n = 0, i = e.length; n < i - 1; n++)
      var a = this.closestOnSegment(t, e[n], e[n + 1]),
        r = Math.min(r, this.distance(t, a));
    return r;
  }
  /**
   * 计算P2P3上距离P1最近的点
   * @param t P1
   * @param e P2
   * @param r P3
   * @returns
   */
  closestOnSegment(t: AMap.LngLatLike, e: AMap.LngLatLike, r: AMap.LngLatLike) {
    return (
      (r = Coordinate.closestOnSegment(this.project(t), this.xr([e, r]))),
      this.unproject(r)
    );
  }
  /**
   * 将经纬度转化为墨卡托坐标系的值
   *
   * @param t
   * @param e
   * @returns
   */
  xr(t: AMap.LngLatLike[], e?: boolean) {
    t = this.normalizeLine(t);
    // @ts-ignore
    t = this.isPoint(t[0]) ? t : t[0];
    for (var r = [], n = 0, i = t.length; n < i; n++)
      r.push(this.project(t[n]));
    return (
      !0 === e
        ? (r = this.makesureClockwise(r))
        : !1 === e && (r = this.makesureClockwise(r)).reverse(),
      r
    );
  }
  /**
   * 将一个路径变为顺时针
   * @param t 一条路径
   * @returns
   */
  makesureClockwise(t: AMap.LngLatLike[]) {
    return isClockwise(t) || (t = [].concat(t)).reverse(), t;
  }
  /**
   * 将一个路径变为逆时针
   * @param t
   * @returns
   */
  makesureAntiClockwise = function (t: AMap.LngLatLike[]) {
    return isClockwise(t) && (t = [].concat(t)).reverse(), t;
  };
  isPoint(t: any) {
    return (
      t &&
      (t instanceof LngLat$2 ||
        (t && t.lat && t.lng) || // 如果一个对象有lat和lng，也认为是一个有效经纬度
        (Array.isArray(t) && !isNaN(t[0])))
    );
  }
  /**
   * 计算line上距离P最近的点
   * @param t P
   * @param e line
   * @returns
   */
  closestOnLine(t, e): AMap.LngLatLike {
    for (
      var r, n = 1 / 0, i = 0, a = (e = this.normalizeLine(e)).length;
      i < a - 1;
      i++
    ) {
      var o = this.closestOnSegment(t, e[i], e[i + 1]),
        s = this.distance(t, o);
      s < n && ((n = s), (r = o));
    }
    return r;
  }
  /**
   * 计算line上距离P最近的点, 并找到最近的线段
   * @param t P
   * @param e line
   * @param findSegment 是否需要找到最近的线段
   * @returns
   */
  closestSegmentOnLine(
    t,
    e
  ): {
    point: AMap.LngLatLike;
    segment?: [number, number];
  } {
    for (
      var r,
        n = 1 / 0,
        i = 0,
        a = (e = this.normalizeLine(e)).length,
        closestSegment;
      i < a - 1;
      i++
    ) {
      var o = this.closestOnSegment(t, e[i], e[i + 1]),
        s = this.distance(t, o);
      s < n && ((n = s), (r = o), (closestSegment = [i, i + 1]));
    }
    return {
      point: r,
      segment: closestSegment,
    };
  }
  /**
   * 判断一个经纬度路径是否为顺时针
   */
  isClockwise(t) {
    return isClockwise((t = this.xr(t)));
  }

  /**
   * 计算经纬度之间的角度
   * 
   * @param prev 前一个点
   * @param current 当前点
   * @returns 
   */
  getAngle(prev, current) {
    const crs = getCrsProjection("EPSG3857");
    var n =
      null === (n = crs) || void 0 === n ? void 0 : n.project(prev[0], prev[1]);
    var current =
      (prev =
        null === (prev = crs) || void 0 === prev
          ? void 0
          : prev.project(current[0], current[1]))[0] - n[0];
    (prev = prev[1] - n[1]), (n = 0);
    return (
      (0 != current || 0 != prev) &&
      (0 != prev
        ? ((n = Math.atan(current / prev)),
          (0 <= current && 0 < prev) ||
            ((0 <= current && prev < 0) || (current < 0 && prev < 0)
              ? (n = Math.PI + n)
              : current < 0 && 0 < prev && (n = 2 * Math.PI + n)))
        : (n = 0 < current ? Math.PI / 2 : (3 * Math.PI) / 2),
      Math.round(((180 * n) / Math.PI) * 10) / 10)
    );
  }
  /**
   * 计算一个经纬度路径的实际长度。单位：米
   * @param t [][number, number]
   * @returns 
   */
  distanceOfLine = function (t) {
    for (var e = 0, r = 0, n = (t = this.normalizeLine(t)).length; r < n - 1; r++) e += this.distance(t[r], t[r + 1]);
    return e;
  }
}

export const GeometryUtil = new GeometryUtilCls();
