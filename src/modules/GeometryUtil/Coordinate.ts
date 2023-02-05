// @ts-nocheck

export const Coordinate = {
  lr: function (t, e) {
    for (var r = 1 / 0, n = 0, i = 1, a = e.length; i < a; n = i, i += 1)
      r = Math.min(r, this.ur(t, [e[n], e[i]]));
    return Math.sqrt(r);
  },
  ur: function (t, e) {
    return this.cr(t, this.closestOnSegment(t, e));
  },
  cr: function (t, e) {
    var r = t[0] - e[0];
    return r * r + (e = t[1] - e[1]) * e;
  },
  pr: function (t, e, r, n) {
    if (((n = n || 1e-6), r[0] !== e[0]))
      return (
        (i = Math.min(e[0], r[0])),
        (a = Math.max(e[0], r[0])),
        (e = ((r[1] - e[1]) / (r[0] - e[0])) * (t[0] - e[0]) + e[1]),
        Math.abs(e - t[1]) < n && t[0] >= i && t[0] <= a
      );
    var i = Math.min(e[1], r[1]),
      a = Math.max(e[1], r[1]);
    return Math.abs(t[0] - r[0]) < n && t[1] >= i && t[1] <= a;
  },
  closestOnSegment: function (t, e) {
    var r,
      n = t[0],
      i = t[1],
      a = e[0],
      o = e[1],
      s = a[0],
      u = a[1],
      t = o[0],
      o = (e = o[1]) - u,
      o =
        (i =
          0 == (a = t - s) && 0 == o
            ? 0
            : (a * (n - s) + o * (i - u)) / (a * a + o * o || 0)) <= 0
          ? ((r = s), u)
          : 1 <= i
          ? ((r = t), e)
          : ((r = s + i * a), u + i * o);
    return [r, o];
  },
  isClockwise: function (t) {
    for (
      var e, r, n = t.length, i = 0, a = t[n - 1], o = a[0], s = a[1], u = 0;
      u < n;
      u += 1
    )
      (i += ((e = (r = t[u])[0]) - o) * ((r = r[1]) + s)), (o = e), (s = r);
    return 0 < i;
  },
  ss: function (t, e, r) {
    for (
      var n = t[0], i = t[1], a = !1, o = e.length, s = 0, u = o - 1;
      s < o;
      u = s, s += 1
    ) {
      var c = !1,
        f = e[s][0],
        l = e[s][1],
        h = e[u][0],
        d = e[u][1];
      if ((f === n && l === i) || (h === n && d === i)) return !!r;
      if (l < i == i <= d) {
        if (n === (f = ((h - f) * (i - l)) / (d - l) + f)) return !!r;
        c = n < f;
      }
      c && (a = !a);
    }
    return a;
  },
  dr: function (t, e) {
    for (
      var r,
        n = function (t, e, r) {
          return (r[0] - e[0]) * (t[1] - e[1]) > (r[1] - e[1]) * (t[0] - e[0]);
        },
        i = function (t, e, r, n) {
          var i = [t[0] - e[0], t[1] - e[1]],
            a = [r[0] - n[0], r[1] - n[1]],
            e = t[0] * e[1] - t[1] * e[0],
            r = r[0] * n[1] - r[1] * n[0],
            n = 1 / (i[0] * a[1] - i[1] * a[0]);
          return [(e * a[0] - r * i[0]) * n, (e * a[1] - r * i[1]) * n];
        },
        a = t,
        o = e[e.length - 2],
        s = 0,
        u = e.length - 1;
      s < u;
      s++
    ) {
      for (
        var c = e[s], f = a, a = [], l = f[f.length - 1], h = 0, d = f.length;
        h < d;
        h++
      )
        n((r = f[h]), o, c)
          ? (n(l, o, c) || a.push(i(o, c, l, r)), a.push(r))
          : n(l, o, c) && a.push(i(o, c, l, r)),
          (l = r);
      o = c;
    }
    return a.length < 3 ? [] : (a.push(a[0]), a);
  },
};
