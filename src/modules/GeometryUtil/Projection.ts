// @ts-nocheck
const projections: { [key: string]: Projection } = {};

type projectFunc = (lng: number, lat: number) => [number, number];

/**
 * 坐标系系统类
 */
export class Projection {
  project: projectFunc;
  unproject: projectFunc;
  getResolution: () => any;

  constructor(t: string, e: projectFunc, r:projectFunc, n) {
    this.project = e;
    this.unproject = r;
    this.getResolution = n;
    projections[t] = this;
  }

  moveWithPixel(t, e, r) {
    var n = this.getResolution(r),
      r = e[0] * n,
      n = e[1] * n,
      t = this.project(t[0], t[1]);
    return this.unproject(t[0] + r, t[1] + n);
  }
  moveWithPos(t, e) {
    return (
      (e = [(t = this.project(t[0], t[1]))[0] + e[0], t[1] + e[1]]),
      this.unproject(e[0], e[1])
    );
  }
}

export const ProjectionManager = {
  getProjection: function (t: string) {
    return projections[t];
  },
};

export function getCrsProjection(t: string) {
  switch (t) {
    case "EPSG3857":
      return ProjectionManager.getProjection("EPSG:3857");
    case "EPSG4326":
      return ProjectionManager.getProjection("EPSG:4326");
  }
  return ProjectionManager.getProjection("EPSG3857");
}

var Rg = Math.PI / 180,
  Sg = 180 / Math.PI,
  Tg = (Tg = 6378137);
var SphericalMercator = new Projection(
  "EPSG:3857",
  function (t, e) {
    var r = 85.0511287798;
    return (
      (e = Math.max(Math.min(r, e), -r)),
      (t *= Rg),
      (e *= Rg),
      (e = Math.log(Math.tan(Math.PI / 4 + e / 2))),
      [t * Tg, e * Tg]
    );
  },
  function (t, e) {
    return [
      (t / Tg) * Sg,
      (2 * Math.atan(Math.exp(e / Tg)) - Math.PI / 2) * Sg,
    ];
  },
  function (t) {
    return 156543.03392804097 / Math.pow(2, t);
  }
);

var LngLat = new Projection(
  "EPSG:4326",
  function (t, e) {
    return [t, e];
  },
  function (t, e) {
    return [t, e];
  },
  function (t) {
    return 0.703125 / Math.pow(2, t);
  }
);
