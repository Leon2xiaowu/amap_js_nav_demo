// @ts-nocheck
function $o(t, e, r?) {
  if (
    (void 0 === r && (r = !1),
    (this.className = "AMap.Pixel"),
    isNaN(t) || isNaN(e))
  )
    throw new Error("Invalid Object: Pixel(" + t + ", " + e + ")");
  (this.x = r ? Math.round(t) : Number(t)),
    (this.y = r ? Math.round(e) : Number(e));
}

export const Pixel =
  (($o.prototype.getX = function () {
    return this.x;
  }),
  ($o.prototype.round = function () {
    return new $o(Math.round(this.x), Math.round(this.y));
  }),
  ($o.prototype.getY = function () {
    return this.y;
  }),
  ($o.prototype.toString = function () {
    return this.x + "," + this.y;
  }),
  ($o.prototype.equals = function (t) {
    return (
      t instanceof $o &&
      Math.max(Math.abs(this.x - t.x), Math.abs(this.y - t.y)) <= 1e-9
    );
  }),
  ($o.prototype.toArray = function () {
    return [this.x, this.y];
  }),
  ($o.prototype.subtract = function (t, e) {
    return new $o(this.x - t.x, this.y - t.y, e);
  }),
  ($o.prototype.multiplyBy = function (t, e) {
    return new $o(this.x * t, this.y * t, e);
  }),
  ($o.prototype.direction = function () {
    var t = this.x,
      e = this.y;
    if (0 === t && 0 === e) return null;
    if (0 === t) return 0 < e ? 90 : 270;
    var r = (180 * Math.atan(e / t)) / Math.PI;
    return (t < 0 && 0 < e) || (t < 0 && e < 0)
      ? 180 + r
      : 0 < t && e < 0
      ? 360 + r
      : r;
  }),
  ($o.prototype.toJSON = function () {
    return [this.x, this.y];
  }),
  $o);
