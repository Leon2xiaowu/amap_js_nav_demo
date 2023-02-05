// @ts-nocheck
// @ts-ignore
!(function () {
  "use strict";
  var commonjsGlobal =
    "undefined" != typeof globalThis
      ? globalThis
      : "undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : "undefined" != typeof self
      ? self
      : {};
  function unwrapExports(x) {
    return x &&
      x.__esModule &&
      Object.prototype.hasOwnProperty.call(x, "default")
      ? x.default
      : x;
  }
  function createCommonjsModule(fn, module) {
    return fn((module = { exports: {} }), module.exports), module.exports;
  }
  var eventemitter = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var _createClass = function (Constructor, protoProps, staticProps) {
      return (
        protoProps && defineProperties(Constructor.prototype, protoProps),
        staticProps && defineProperties(Constructor, staticProps),
        Constructor
      );
    };
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        (descriptor.enumerable = descriptor.enumerable || !1),
          (descriptor.configurable = !0),
          "value" in descriptor && (descriptor.writable = !0),
          Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    var _uid = -1;
    var EventEmitter = (function () {
      function EventEmitter() {
        !(function (instance, Constructor) {
          if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function");
        })(this, EventEmitter),
          (this.__events__ = {}),
          (this.__id__ = ++_uid);
      }
      return (
        _createClass(EventEmitter, [
          {
            key: "on",
            value: function (type, listener, context) {
              var events = this.__events__,
                listeners = (events[type] = events[type] || []);
              context === this && (context = void 0);
              for (var i = -1, len = listeners; ++i < len; ) {
                var ctx = listeners[i],
                  fn = ctx.fn,
                  ctx = ctx.ctx;
                if (fn === listener && ctx === context) return this;
              }
              return listeners.push({ fn: listener, ctx: context }), this;
            },
          },
          {
            key: "once",
            value: function (type, listener, context) {
              function onceCallback(ev) {
                this.off(type, onceCallback), listener.call(this, ev);
              }
              return (
                (onceCallback.listener = listener),
                this.on(type, onceCallback, context)
              );
            },
          },
          {
            key: "off",
            value: function (type, listener, context) {
              var events = this.__events__;
              if (!type) return (this.__events__ = {}), this;
              if (!listener) return delete events[type], this;
              var listeners = events[type];
              if (listeners)
                for (var i = listeners.length; 0 <= --i; ) {
                  var _listeners$i2 = listeners[i],
                    fn = _listeners$i2.fn;
                  _listeners$i2.ctx === context &&
                    ((fn !== listener && fn !== fn.listener) ||
                      (listeners.splice(i, 1), (fn = function () {})));
                }
              return this;
            },
          },
          {
            key: "emit",
            value: function (type, data) {
              var listeners = this.__events__[type];
              if (listeners)
                for (
                  var event = (function (dest) {
                      for (
                        var j = -1,
                          len =
                            arguments.length <= 1 ? 0 : arguments.length - 1;
                        ++j < len;

                      ) {
                        var i,
                          src =
                            arguments.length <= j + 1
                              ? void 0
                              : arguments[j + 1];
                        for (i in src)
                          src.hasOwnProperty(i) && (dest[i] = src[i]);
                      }
                      return dest;
                    })({}, data, { target: this, type: type }),
                    i = -1,
                    len = listeners.length;
                  ++i < len;

                ) {
                  var ctx = listeners[i],
                    fn = ctx.fn,
                    ctx = ctx.ctx;
                  fn.call(ctx || this, event);
                }
              return this;
            },
          },
          {
            key: "events",
            get: function () {
              return this.__events__;
            },
          },
          {
            key: "id",
            get: function () {
              return this.__id__;
            },
          },
        ]),
        EventEmitter
      );
    })();
    exports.default = EventEmitter;
  });
  unwrapExports(eventemitter);
  var util = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var _slicedToArray = function (arr, i) {
      if (Array.isArray(arr)) return arr;
      if (Symbol.iterator in Object(arr))
        return (function (arr, i) {
          var _arr = [],
            _n = !0,
            _d = !1,
            _e = void 0;
          try {
            for (
              var _s, _i = arr[Symbol.iterator]();
              !(_n = (_s = _i.next()).done) &&
              (_arr.push(_s.value), !i || _arr.length !== i);
              _n = !0
            );
          } catch (err) {
            (_d = !0), (_e = err);
          } finally {
            try {
              !_n && _i.return && _i.return();
            } finally {
              if (_d) throw _e;
            }
          }
          return _arr;
        })(arr, i);
      throw new TypeError(
        "Invalid attempt to destructure non-iterable instance"
      );
    };
    exports.default = {
      remove: function (array, predicate) {
        var result = [];
        if (!array || !array.length) return result;
        if ("function" == typeof predicate) {
          for (
            var index = -1, indexes = [], length = array.length;
            ++index < length;

          ) {
            var value = array[index];
            predicate(value, index, array) &&
              (result.push(value), indexes.push(index));
          }
          !(function (array, indexes) {
            for (var length = array ? indexes.length : 0; 0 < length--; ) {
              var index = indexes[length];
              array.splice(index, 1);
            }
          })(array, indexes);
        }
        return result;
      },
      normalize: function normalize(arr) {
        var _options$max =
          1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
        if (!Array.isArray(arr)) return arr;
        for (
          var rMax = _options$max.type,
            type = void 0 === rMax ? "" : rMax,
            _options$min = _options$max.range,
            rMax = void 0 === _options$min ? [0, 1] : _options$min,
            _options$min = _options$max.min,
            min =
              void 0 === _options$min
                ? Math.min.apply(Math, arr)
                : _options$min,
            _options$max = _options$max.max,
            max =
              void 0 === _options$max
                ? Math.max.apply(Math, arr)
                : _options$max,
            type = type.toLowerCase(),
            normalizationArr = [],
            diff = max - min,
            i = -1,
            len = arr.length;
          ++i < len;

        ) {
          var v = arr[i];
          (v = max < v ? max : v) < min && (v = min);
          var v2 = void 0,
            v2 = "log" !== type ? (v - min) / diff : Math.log10(v);
          normalizationArr.push(v2);
        }
        "log" === type && (normalizationArr = normalize(normalizationArr));
        var rMax = _slicedToArray(rMax, 2),
          rMin = rMax[0],
          rMax = rMax[1];
        if (0 !== rMin || 1 !== rMax) {
          for (
            var _i = -1,
              _len = normalizationArr.length,
              _diff = rMax - rMin,
              norArr = [];
            ++_i < _len;

          ) {
            var _v = normalizationArr[_i];
            norArr.push(_diff * _v + rMin);
          }
          normalizationArr = norArr;
        }
        return normalizationArr;
      },
      forInMap: function (obj, callback) {
        for (var key in obj)
          obj.hasOwnProperty(key) && callback(obj[key], key, obj);
      },
    };
  });
  unwrapExports(util);
  var animationframe = createCommonjsModule(function (module, exports) {
    var offset;
    Object.defineProperty(exports, "__esModule", { value: !0 }),
      "performance" in window == !1 && (window.performance = {}),
      (Date.now =
        Date.now ||
        function () {
          return new Date().getTime();
        }),
      "now" in window.performance == !1 &&
        ((offset =
          window.performance.timing && window.performance.timing.navigationStart
            ? window.performance.timing.navigationStart
            : Date.now()),
        (window.performance.now = function () {
          return Date.now() - offset;
        }));
    var requestAnimationFrame =
        ("undefined" != typeof window &&
          (window.requestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame)) ||
        function (callback) {
          setTimeout(callback, 16);
        },
      cancelAnimationFrame =
        ("undefined" != typeof window &&
          (window.cancelAnimationFrame ||
            window.msCancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            window.webkitCancelAnimationFrame)) ||
        function (timer) {
          clearTimeout(timer);
        };
    (exports.requestAnimationFrame = requestAnimationFrame),
      (exports.cancelAnimationFrame = cancelAnimationFrame);
  });
  unwrapExports(animationframe);
  animationframe.requestAnimationFrame, animationframe.cancelAnimationFrame;
  var define = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: !0 });
    (exports.Ev = {
      UPDATE: "update",
      START: "start",
      REPEAT: "repeat",
      REPEAT_COMPLETE: "repeatComplete",
      AFTER_UPDATE: "afterUpdate",
      COMPLETE: "complete",
      PAUSE: "pause",
      STOP: "stop",
      RESET: "reset",
    }),
      (exports.Attr = {
        DURATION: "duration",
        REPEAT: "repeat",
        DELAY: "delay",
        EASING: "easing",
        INTERVAL: "interval",
        YOYO: "yoyo",
        START: "startAt",
      }),
      (exports.Easing = {
        LINEAR: "Linear",
        QUADRATIC_IN: "QuadraticIn",
        QUADRATIC_OUT: "QuadraticOut",
        QUADRATIC_IN_OUT: "QuadraticInOut",
        CUBIC_IN: "CubicIn",
        CUBIC_OUT: "CubicOut",
        CUBIC_IN_OUT: "CubicInOut",
        QUARTIC_IN: "QuarticIn",
        QUARTIC_OUT: "QuarticOut",
        QUARTIC_IN_OUT: "QuarticInOut",
        QUINTIC_IN: "QuinticIn",
        QUINTIC_OUT: "QuinticOut",
        QUINTIC_IN_OUT: "QuinticInOut",
        SINUSOIDAL_IN: "SinusoidalIn",
        SINUSOIDAL_OUT: "SinusoidalOut",
        SINUSOIDAL_IN_OUT: "SinusoidalInOut",
        EXPONENTIAL_IN: "ExponentialIn",
        EXPONENTIAL_OUT: "ExponentialOut",
        EXPONENTIAL_IN_OUT: "ExponentialInOut",
        CIRCULAR_IN: "CircularIn",
        CIRCULAR_OUT: "CircularOut",
        CIRCULAR_IN_OUT: "CircularInOut",
        ELASTIC_IN: "ElasticIn",
        ELASTIC_OUT: "ElasticOut",
        ELASTIC_IN_OUT: "ElasticInOut",
        BACK_IN: "BackIn",
        BACK_OUT: "BackOut",
        BACK_IN_OUT: "BackInOut",
        BOUNCE_IN: "BounceIn",
        BOUNCE_OUT: "BounceOut",
        BOUNCE_IN_OUT: "BounceInOut",
      });
  });
  unwrapExports(define);
  define.Ev, define.Attr, define.Easing;
  var animation = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var _createClass = function (Constructor, protoProps, staticProps) {
      return (
        protoProps && defineProperties(Constructor.prototype, protoProps),
        staticProps && defineProperties(Constructor, staticProps),
        Constructor
      );
    };
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        (descriptor.enumerable = descriptor.enumerable || !1),
          (descriptor.configurable = !0),
          "value" in descriptor && (descriptor.writable = !0),
          Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    var _eventemitter2 = _interopRequireDefault(eventemitter),
      Animation = _interopRequireDefault(util);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var remove = Animation.default.remove,
      forInMap = Animation.default.forInMap,
      Animation = (function () {
        function Animation(options) {
          !(function (instance, Constructor) {
            if (!(instance instanceof Constructor))
              throw new TypeError("Cannot call a class as a function");
          })(this, Animation);
          var _this = (function (self, call) {
            if (!self)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return !call ||
              ("object" != typeof call && "function" != typeof call)
              ? self
              : call;
          })(
            this,
            (Animation.__proto__ || Object.getPrototypeOf(Animation)).call(this)
          );
          return (
            (_this._options = {}),
            (_this._savedClipMap = {}),
            (_this._clips = []),
            (_this._clipMap = {}),
            (_this._options = options || {}),
            _this
          );
        }
        return (
          (function (subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass)
              throw new TypeError(
                "Super expression must either be null or a function, not " +
                  typeof superClass
              );
            (subClass.prototype = Object.create(
              superClass && superClass.prototype,
              {
                constructor: {
                  value: subClass,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                },
              }
            )),
              superClass &&
                (Object.setPrototypeOf
                  ? Object.setPrototypeOf(subClass, superClass)
                  : (subClass.__proto__ = superClass));
          })(Animation, _eventemitter2["default"]),
          _createClass(Animation, [
            {
              key: "_startAni",
              value: function () {
                function update(timestamp) {
                  (_this2._timer = (0, animationframe.requestAnimationFrame)(
                    update
                  )),
                    _this2._update(timestamp);
                }
                var _this2 = this;
                this._timer = (0, animationframe.requestAnimationFrame)(update);
              },
            },
            {
              key: "_stopAni",
              value: function () {
                var timer = this._timer;
                return (
                  !!timer &&
                  ((0, animationframe.cancelAnimationFrame)(timer),
                  !(this._timer = null))
                );
              },
            },
            {
              key: "_update",
              value: function (timestamp) {
                var clips = this._clips;
                this.emit(define.Ev.UPDATE, { timestamp: timestamp });
                for (var i = 0; i < clips.length; ) {
                  var clip = clips[i];
                  clip.update(timestamp) ? i++ : this._rmClip(clip);
                }
                (this._clips = clips),
                  this.emit(define.Ev.AFTER_UPDATE),
                  0 === clips.length &&
                    (this._stopAni(), this.emit(define.Ev.COMPLETE));
              },
            },
            {
              key: "start",
              value: function () {
                var clips = this._clips,
                  len = clips.length;
                if (this._timer || 0 === len) return this;
                this.emit(define.Ev.START);
                for (var i = -1; ++i < len; ) clips[i].start();
                return this._startAni(), this;
              },
            },
            {
              key: "stop",
              value: function () {
                return this._stop(!1), this;
              },
            },
            {
              key: "pause",
              value: function () {
                return this._stop(!0), this;
              },
            },
            {
              key: "reset",
              value: function () {
                this._stop(!1, !0, !1);
                var savedMap = this._savedClipMap,
                  list = [];
                return (
                  forInMap(savedMap, function (value) {
                    value.stop(!0), list.push(value);
                  }),
                  (this._clips = list),
                  this.emit(define.Ev.RESET),
                  this
                );
              },
            },
            {
              key: "_stop",
              value: function (pause, reset) {
                var emit =
                  !(2 < arguments.length && void 0 !== arguments[2]) ||
                  arguments[2];
                this._stopAni();
                var clips = this._clips,
                  len = clips.length;
                if (len) {
                  for (var i = -1; ++i < len; ) {
                    var clip = clips[i];
                    pause ? clip.pause() : clip.stop(reset);
                  }
                  emit && this.emit(pause ? define.Ev.PAUSE : define.Ev.STOP);
                }
              },
            },
            {
              key: "addClip",
              value: function (clips) {
                for (
                  var startClip =
                      !(1 < arguments.length && void 0 !== arguments[1]) ||
                      arguments[1],
                    i = -1,
                    len = (clips = !Array.isArray(clips) ? [clips] : clips)
                      .length;
                  ++i < len;

                ) {
                  var clip = clips[i];
                  this._hasSavedClip(clip) ||
                    (this._addClip(clip),
                    this._addSavedClip(clip),
                    this._timer && startClip && clip.start());
                }
                return this;
              },
            },
            {
              key: "_addClip",
              value: function (clip) {
                var _c = this._clips;
                -1 === _c.indexOf(clip) &&
                  (_c.push(clip), (clip._animation = this));
              },
            },
            {
              key: "_addSavedClip",
              value: function (clip) {
                var clipMap = this._savedClipMap,
                  id = clip.id;
                clipMap[id] !== clip &&
                  ((clipMap[id] = clip)._animation = this);
              },
            },
            {
              key: "removeClip",
              value: function (clip) {
                var savedMap = this._savedClipMap;
                return (
                  clip
                    ? (this._rmClip(clip),
                      this._rmSavedClip(clip),
                      (clip._animation = null))
                    : (forInMap(savedMap, function (value) {
                        value._animation = null;
                      }),
                      (this._clips = []),
                      (this._savedClipMap = {})),
                  this
                );
              },
            },
            {
              key: "_rmClip",
              value: function (clip) {
                remove(this._clips, function (c) {
                  return c === clip;
                });
              },
            },
            {
              key: "_rmSavedClip",
              value: function (clip) {
                this._hasSavedClip(clip) && delete this._savedClipMap[clip.id];
              },
            },
            {
              key: "getClips",
              value: function () {
                return this._clips;
              },
            },
            {
              key: "_hasSavedClip",
              value: function (clip) {
                var savedClip = clip.id,
                  savedClip = this._savedClipMap[savedClip];
                return savedClip && savedClip === clip;
              },
            },
            {
              key: "_hasClip",
              value: function (clip) {
                return -1 !== this._clips.indexOf(clip);
              },
            },
            {
              key: "destroy",
              value: function () {
                this.off(), this._stopAni(), this.removeClip();
              },
            },
          ]),
          Animation
        );
      })();
    (Animation.Event = define.Ev), (exports.default = Animation);
  });
  unwrapExports(animation);
  var easing = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var Easing = {
      Linear: function (k) {
        return k;
      },
      QuadraticIn: function (k) {
        return k * k;
      },
      QuadraticOut: function (k) {
        return k * (2 - k);
      },
      QuadraticInOut: function (k) {
        return (k *= 2) < 1 ? 0.5 * k * k : -0.5 * (--k * (k - 2) - 1);
      },
      CubicIn: function (k) {
        return k * k * k;
      },
      CubicOut: function (k) {
        return --k * k * k + 1;
      },
      CubicInOut: function (k) {
        return (k *= 2) < 1 ? 0.5 * k * k * k : 0.5 * ((k -= 2) * k * k + 2);
      },
      QuarticIn: function (k) {
        return k * k * k * k;
      },
      QuarticOut: function (k) {
        return 1 - --k * k * k * k;
      },
      QuarticInOut: function (k) {
        return (k *= 2) < 1
          ? 0.5 * k * k * k * k
          : -0.5 * ((k -= 2) * k * k * k - 2);
      },
      QuinticIn: function (k) {
        return k * k * k * k * k;
      },
      QuinticOut: function (k) {
        return --k * k * k * k * k + 1;
      },
      QuinticInOut: function (k) {
        return (k *= 2) < 1
          ? 0.5 * k * k * k * k * k
          : 0.5 * ((k -= 2) * k * k * k * k + 2);
      },
      SinusoidalIn: function (k) {
        return 1 - Math.cos((k * Math.PI) / 2);
      },
      SinusoidalOut: function (k) {
        return Math.sin((k * Math.PI) / 2);
      },
      SinusoidalInOut: function (k) {
        return 0.5 * (1 - Math.cos(Math.PI * k));
      },
      ExponentialIn: function (k) {
        return 0 === k ? 0 : Math.pow(1024, k - 1);
      },
      ExponentialOut: function (k) {
        return 1 === k ? 1 : 1 - Math.pow(2, -10 * k);
      },
      ExponentialInOut: function (k) {
        return 0 === k
          ? 0
          : 1 === k
          ? 1
          : (k *= 2) < 1
          ? 0.5 * Math.pow(1024, k - 1)
          : 0.5 * (2 - Math.pow(2, -10 * (k - 1)));
      },
      CircularIn: function (k) {
        return 1 - Math.sqrt(1 - k * k);
      },
      CircularOut: function (k) {
        return Math.sqrt(1 - --k * k);
      },
      CircularInOut: function (k) {
        return (k *= 2) < 1
          ? -0.5 * (Math.sqrt(1 - k * k) - 1)
          : 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
      },
      ElasticIn: function (k) {
        var s,
          a = 0.1;
        return 0 === k
          ? 0
          : 1 === k
          ? 1
          : ((s =
              !a || a < 1
                ? ((a = 1), 0.1)
                : (0.4 * Math.asin(1 / a)) / (2 * Math.PI)),
            -(
              a *
              Math.pow(2, 10 * --k) *
              Math.sin(((k - s) * (2 * Math.PI)) / 0.4)
            ));
      },
      ElasticOut: function (k) {
        var s,
          a = 0.1;
        return 0 === k
          ? 0
          : 1 === k
          ? 1
          : ((s =
              !a || a < 1
                ? ((a = 1), 0.1)
                : (0.4 * Math.asin(1 / a)) / (2 * Math.PI)),
            a *
              Math.pow(2, -10 * k) *
              Math.sin(((k - s) * (2 * Math.PI)) / 0.4) +
              1);
      },
      ElasticInOut: function (k) {
        var s,
          a = 0.1;
        return 0 === k
          ? 0
          : 1 === k
          ? 1
          : ((s =
              !a || a < 1
                ? ((a = 1), 0.1)
                : (0.4 * Math.asin(1 / a)) / (2 * Math.PI)),
            (k *= 2) < 1
              ? a *
                Math.pow(2, 10 * --k) *
                Math.sin(((k - s) * (2 * Math.PI)) / 0.4) *
                -0.5
              : a *
                  Math.pow(2, -10 * --k) *
                  Math.sin(((k - s) * (2 * Math.PI)) / 0.4) *
                  0.5 +
                1);
      },
      BackIn: function (k) {
        var s = 1.70158;
        return k * k * ((1 + s) * k - s);
      },
      BackOut: function (k) {
        var s = 1.70158;
        return --k * k * ((1 + s) * k + s) + 1;
      },
      BackInOut: function (k) {
        var s = 2.5949095;
        return (k *= 2) < 1
          ? k * k * ((1 + s) * k - s) * 0.5
          : 0.5 * ((k -= 2) * k * ((1 + s) * k + s) + 2);
      },
      BounceIn: function (k) {
        return 1 - Easing.BounceOut(1 - k);
      },
      BounceOut: function (k) {
        return k < 1 / 2.75
          ? 7.5625 * k * k
          : k < 2 / 2.75
          ? 7.5625 * (k -= 1.5 / 2.75) * k + 0.75
          : k < 2.5 / 2.75
          ? 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375
          : 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
      },
      BounceInOut: function (k) {
        return k < 0.5
          ? 0.5 * Easing.BounceIn(2 * k)
          : 0.5 * Easing.BounceOut(2 * k - 1) + 0.5;
      },
    };
    exports.default = Easing;
  });
  unwrapExports(easing);
  var Interpolation_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var a,
      Interpolation = {
        Linear: function (v, k) {
          var m = v.length - 1,
            f = m * k,
            i = Math.floor(f),
            fn = Interpolation.Utils.Linear;
          return k < 0
            ? fn(v[0], v[1], f)
            : 1 < k
            ? fn(v[m], v[m - 1], m - f)
            : fn(v[i], v[m < i + 1 ? m : i + 1], f - i);
        },
        Bezier: function (v, k) {
          for (
            var b = 0,
              n = v.length - 1,
              pw = Math.pow,
              bn = Interpolation.Utils.Bernstein,
              i = 0;
            i <= n;
            i++
          )
            b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
          return b;
        },
        CatmullRom: function (v, k) {
          var m = v.length - 1,
            f = m * k,
            i = Math.floor(f),
            fn = Interpolation.Utils.CatmullRom;
          return v[0] === v[m]
            ? fn(
                v[
                  ((i = k < 0 ? Math.floor((f = m * (1 + k))) : i) - 1 + m) % m
                ],
                v[i],
                v[(i + 1) % m],
                v[(i + 2) % m],
                f - i
              )
            : k < 0
            ? v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0])
            : 1 < k
            ? v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m])
            : fn(
                v[i ? i - 1 : 0],
                v[i],
                v[m < i + 1 ? m : i + 1],
                v[m < i + 2 ? m : i + 2],
                f - i
              );
        },
        Utils: {
          Linear: function (p0, p1, t) {
            return (p1 - p0) * t + p0;
          },
          Bernstein: function (n, i) {
            var fc = Interpolation.Utils.Factorial;
            return fc(n) / fc(i) / fc(n - i);
          },
          Factorial:
            ((a = [1]),
            function (n) {
              var s = 1;
              if (a[n]) return a[n];
              for (var i = n; 1 < i; i--) s *= i;
              return (a[n] = s);
            }),
          CatmullRom: function (v1, p1, p2, t2, t) {
            var v0 = 0.5 * (p2 - v1),
              v1 = 0.5 * (t2 - p1),
              t2 = t * t;
            return (
              (2 * p1 - 2 * p2 + v0 + v1) * (t * t2) +
              (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 +
              v0 * t +
              p1
            );
          },
        },
      };
    exports.default = Interpolation;
  });
  unwrapExports(Interpolation_1);
  var clip = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var _createClass = function (Constructor, protoProps, staticProps) {
      return (
        protoProps && defineProperties(Constructor.prototype, protoProps),
        staticProps && defineProperties(Constructor, staticProps),
        Constructor
      );
    };
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        (descriptor.enumerable = descriptor.enumerable || !1),
          (descriptor.configurable = !0),
          "value" in descriptor && (descriptor.writable = !0),
          Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    var _eventemitter2 = _interopRequireDefault(eventemitter),
      _easing2 = _interopRequireDefault(easing),
      _Interpolation2 = _interopRequireDefault(Interpolation_1);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var Clip = (function () {
      function Clip(options, attr) {
        !(function (instance, Constructor) {
          if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function");
        })(this, Clip);
        var _this = (function (self, call) {
          if (!self)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return !call || ("object" != typeof call && "function" != typeof call)
            ? self
            : call;
        })(this, (Clip.__proto__ || Object.getPrototypeOf(Clip)).call(this));
        return (
          (_this._options = {}),
          (_this._attr = {}),
          (_this._startAt = 0),
          (_this._stopped = !0),
          (_this._paused = !1),
          (_this._startTime = 0),
          (_this._pauseStart = 0),
          (_this._pauseTime = 0),
          (_this._reversed = !1),
          (_this._chainClips = []),
          (_this._tracks = []),
          (_this._interpolation = _Interpolation2.default.Linear),
          (_this._options = options || {}),
          (_this._attr = attr),
          _this._initOption(options),
          (_this._tracks = _this._transform(attr)),
          _this
        );
      }
      return (
        (function (subClass, superClass) {
          if ("function" != typeof superClass && null !== superClass)
            throw new TypeError(
              "Super expression must either be null or a function, not " +
                typeof superClass
            );
          (subClass.prototype = Object.create(
            superClass && superClass.prototype,
            {
              constructor: {
                value: subClass,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            }
          )),
            superClass &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(subClass, superClass)
                : (subClass.__proto__ = superClass));
        })(Clip, _eventemitter2["default"]),
        _createClass(Clip, null, [
          {
            key: "registerPlugin",
            value: function (plugin) {
              var type = plugin.type,
                plugins = this._plugins;
              (plugins && plugins[type]) ||
                ((this._plugins = plugins || {}),
                (this._plugins[type] = plugin));
            },
          },
        ]),
        _createClass(Clip, [
          {
            key: "_initOption",
            value: function (options) {
              var dur = options[define.Attr.EASING] || define.Easing.LINEAR;
              (this._easing = _easing2.default[dur] || dur),
                (this._delay = options[define.Attr.DELAY] || 0);
              dur = options[define.Attr.DURATION];
              (this._duration = void 0 === dur ? 1e3 : dur),
                (this._repeat_0 = this._repeat =
                  options[define.Attr.REPEAT] || 1),
                (this._interval = options[define.Attr.INTERVAL] || 0),
                (this._yoyo = options[define.Attr.YOYO] || !1),
                (this._startAt = options[define.Attr.START] || 0);
            },
          },
          {
            key: "_transform",
            value: function (attr) {
              var key,
                _plugins = this.constructor._plugins,
                _attrList = [];
              for (key in attr)
                if (attr.hasOwnProperty(key)) {
                  var type,
                    value = attr[key];
                  for (type in _plugins) {
                    var plugin = _plugins[type];
                    if (plugin.test(value, key)) {
                      (value = plugin.parse(value, key)).__type__ = plugin.type;
                      break;
                    }
                  }
                  _attrList.push({ key: key, value: value });
                }
              return _attrList;
            },
          },
          {
            key: "start",
            value: function (force) {
              var repeat = window.performance.now(),
                onceRepeat = !1;
              if (this._paused)
                (this._pauseTime += repeat - this._pauseStart),
                  (this._paused = !1);
              else {
                if (!force && !this._stopped) return this;
                (this._stopped = !(onceRepeat = !0)),
                  (this._startTime = repeat + this._delay);
              }
              this.emit(define.Ev.START);
              repeat = this._repeat;
              return (
                1 < repeat &&
                  repeat === this._repeat_0 &&
                  onceRepeat &&
                  this.emit(define.Ev.REPEAT, { remain: 0 }),
                this
              );
            },
          },
          {
            key: "stop",
            value: function (reset) {
              return (
                this._stopped ||
                  ((this._stopped = !0),
                  (this._paused = !1),
                  (this._pauseTime = 0),
                  (this._pauseStart = 0),
                  this.emit(define.Ev.STOP),
                  this.stopChain()),
                reset && (this._repeat = this._repeat_0),
                this
              );
            },
          },
          {
            key: "pause",
            value: function () {
              return (
                this._stopped ||
                  this._paused ||
                  ((this._paused = !0),
                  (this._pauseStart = window.performance.now()),
                  this.emit(define.Ev.PAUSE)),
                this
              );
            },
          },
          {
            key: "update",
            value: function (elapsed) {
              if (this._stopped) return !0;
              if (this._paused || (elapsed && elapsed < this._startTime))
                return !0;
              var t = elapsed - this._pauseTime,
                keyframe = this._getProgress(t),
                progress = keyframe.progress,
                elapsed = keyframe.elapsed,
                keyframe = this._updateAttr(progress, elapsed);
              return (
                this.emit(define.Ev.UPDATE, {
                  progress: progress,
                  keyframe: keyframe,
                  elapsed: elapsed,
                }),
                this._afterUpdate(t, elapsed)
              );
            },
          },
          {
            key: "_getProgress",
            value: function (elapsed) {
              elapsed = (elapsed - this._startTime) / this._duration;
              elapsed += this._startAt;
              elapsed = Math.min(elapsed, 1);
              return {
                progress: this._easing(this._reversed ? 1 - elapsed : elapsed),
                elapsed: elapsed,
              };
            },
          },
          {
            key: "_updateAttr",
            value: function (progress, elapsed) {
              for (
                var tracks = this._tracks,
                  keyframe = {},
                  i = 0,
                  len = tracks.length;
                i < len;

              ) {
                var type = tracks[i++],
                  key = type.key,
                  value = type.value,
                  type = value.__type__;
                (value = type
                  ? this.constructor._plugins[type].valueOf(
                      value,
                      progress,
                      elapsed,
                      key
                    )
                  : this._interpolation(value, progress)),
                  (keyframe[key] = value);
              }
              return keyframe;
            },
          },
          {
            key: "_afterUpdate",
            value: function (time, repeat_0) {
              if (1 !== repeat_0) return !0;
              var repeat = this._repeat,
                repeat_0 = this._repeat_0;
              if (1 < repeat)
                return (
                  isFinite(repeat) && repeat--,
                  (this._startTime = time + this._interval),
                  (this._startAt = 0),
                  this._yoyo && (this._reversed = !this._reversed),
                  (this._repeat = repeat),
                  this.emit(define.Ev.REPEAT_COMPLETE, { repeat: repeat }),
                  this.emit(define.Ev.REPEAT, { remain: repeat_0 - repeat }),
                  !0
                );
              (this._stopped = !0),
                (this._pauseTime = 0),
                (this._pauseStart = 0),
                1 < (this._repeat = repeat_0) &&
                  this.emit(define.Ev.REPEAT_COMPLETE, { repeat: 0 }),
                this.emit(define.Ev.COMPLETE);
              for (
                var i = -1,
                  chains = this._chainClips,
                  len = chains.length,
                  ani = this._animation;
                ++i < len;

              ) {
                var clip = chains[i];
                ani && ani._addClip(clip), clip.start();
              }
              return !1;
            },
          },
          {
            key: "chain",
            value: function () {
              for (
                var _len = arguments.length, args = Array(_len), _key = 0;
                _key < _len;
                _key++
              )
                args[_key] = arguments[_key];
              return (this._chainClips = args), this;
            },
          },
          {
            key: "stopChain",
            value: function () {
              for (
                var i = -1, clips = this._chainClips, len = clips.length;
                ++i < len;

              )
                clips[i].stop();
              return this;
            },
          },
          {
            key: "destroy",
            value: function () {
              this.off(),
                (this._stopped = !0),
                (this._paused = !1),
                (this._startTime = 0),
                (this._pauseTime = 0),
                (this._pauseStart = 0),
                (this._chainClips = []);
              var ani = this._animation;
              ani && ani.removeClip(this), (this._animation = null);
            },
          },
        ]),
        Clip
      );
    })();
    (Clip.Event = define.Ev),
      (Clip.Attr = define.Attr),
      (Clip.Easing = define.Easing),
      (exports.default = Clip);
  });
  unwrapExports(clip);
  var core = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: !0 }),
      (exports.Clip = exports.Animation = void 0);
    var _animation2 = _interopRequireDefault(animation),
      _clip2 = _interopRequireDefault(clip);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    (exports.default = {
      Animation: _animation2.default,
      Clip: _clip2.default,
    }),
      (exports.Animation = _animation2.default),
      (exports.Clip = _clip2.default);
  });
  unwrapExports(core);
  core.Clip, core.Animation;
  var csscolorparser = createCommonjsModule(function (module, exports) {
      var kCSSColorTable = {
        transparent: [0, 0, 0, 0],
        aliceblue: [240, 248, 255, 1],
        antiquewhite: [250, 235, 215, 1],
        aqua: [0, 255, 255, 1],
        aquamarine: [127, 255, 212, 1],
        azure: [240, 255, 255, 1],
        beige: [245, 245, 220, 1],
        bisque: [255, 228, 196, 1],
        black: [0, 0, 0, 1],
        blanchedalmond: [255, 235, 205, 1],
        blue: [0, 0, 255, 1],
        blueviolet: [138, 43, 226, 1],
        brown: [165, 42, 42, 1],
        burlywood: [222, 184, 135, 1],
        cadetblue: [95, 158, 160, 1],
        chartreuse: [127, 255, 0, 1],
        chocolate: [210, 105, 30, 1],
        coral: [255, 127, 80, 1],
        cornflowerblue: [100, 149, 237, 1],
        cornsilk: [255, 248, 220, 1],
        crimson: [220, 20, 60, 1],
        cyan: [0, 255, 255, 1],
        darkblue: [0, 0, 139, 1],
        darkcyan: [0, 139, 139, 1],
        darkgoldenrod: [184, 134, 11, 1],
        darkgray: [169, 169, 169, 1],
        darkgreen: [0, 100, 0, 1],
        darkgrey: [169, 169, 169, 1],
        darkkhaki: [189, 183, 107, 1],
        darkmagenta: [139, 0, 139, 1],
        darkolivegreen: [85, 107, 47, 1],
        darkorange: [255, 140, 0, 1],
        darkorchid: [153, 50, 204, 1],
        darkred: [139, 0, 0, 1],
        darksalmon: [233, 150, 122, 1],
        darkseagreen: [143, 188, 143, 1],
        darkslateblue: [72, 61, 139, 1],
        darkslategray: [47, 79, 79, 1],
        darkslategrey: [47, 79, 79, 1],
        darkturquoise: [0, 206, 209, 1],
        darkviolet: [148, 0, 211, 1],
        deeppink: [255, 20, 147, 1],
        deepskyblue: [0, 191, 255, 1],
        dimgray: [105, 105, 105, 1],
        dimgrey: [105, 105, 105, 1],
        dodgerblue: [30, 144, 255, 1],
        firebrick: [178, 34, 34, 1],
        floralwhite: [255, 250, 240, 1],
        forestgreen: [34, 139, 34, 1],
        fuchsia: [255, 0, 255, 1],
        gainsboro: [220, 220, 220, 1],
        ghostwhite: [248, 248, 255, 1],
        gold: [255, 215, 0, 1],
        goldenrod: [218, 165, 32, 1],
        gray: [128, 128, 128, 1],
        green: [0, 128, 0, 1],
        greenyellow: [173, 255, 47, 1],
        grey: [128, 128, 128, 1],
        honeydew: [240, 255, 240, 1],
        hotpink: [255, 105, 180, 1],
        indianred: [205, 92, 92, 1],
        indigo: [75, 0, 130, 1],
        ivory: [255, 255, 240, 1],
        khaki: [240, 230, 140, 1],
        lavender: [230, 230, 250, 1],
        lavenderblush: [255, 240, 245, 1],
        lawngreen: [124, 252, 0, 1],
        lemonchiffon: [255, 250, 205, 1],
        lightblue: [173, 216, 230, 1],
        lightcoral: [240, 128, 128, 1],
        lightcyan: [224, 255, 255, 1],
        lightgoldenrodyellow: [250, 250, 210, 1],
        lightgray: [211, 211, 211, 1],
        lightgreen: [144, 238, 144, 1],
        lightgrey: [211, 211, 211, 1],
        lightpink: [255, 182, 193, 1],
        lightsalmon: [255, 160, 122, 1],
        lightseagreen: [32, 178, 170, 1],
        lightskyblue: [135, 206, 250, 1],
        lightslategray: [119, 136, 153, 1],
        lightslategrey: [119, 136, 153, 1],
        lightsteelblue: [176, 196, 222, 1],
        lightyellow: [255, 255, 224, 1],
        lime: [0, 255, 0, 1],
        limegreen: [50, 205, 50, 1],
        linen: [250, 240, 230, 1],
        magenta: [255, 0, 255, 1],
        maroon: [128, 0, 0, 1],
        mediumaquamarine: [102, 205, 170, 1],
        mediumblue: [0, 0, 205, 1],
        mediumorchid: [186, 85, 211, 1],
        mediumpurple: [147, 112, 219, 1],
        mediumseagreen: [60, 179, 113, 1],
        mediumslateblue: [123, 104, 238, 1],
        mediumspringgreen: [0, 250, 154, 1],
        mediumturquoise: [72, 209, 204, 1],
        mediumvioletred: [199, 21, 133, 1],
        midnightblue: [25, 25, 112, 1],
        mintcream: [245, 255, 250, 1],
        mistyrose: [255, 228, 225, 1],
        moccasin: [255, 228, 181, 1],
        navajowhite: [255, 222, 173, 1],
        navy: [0, 0, 128, 1],
        oldlace: [253, 245, 230, 1],
        olive: [128, 128, 0, 1],
        olivedrab: [107, 142, 35, 1],
        orange: [255, 165, 0, 1],
        orangered: [255, 69, 0, 1],
        orchid: [218, 112, 214, 1],
        palegoldenrod: [238, 232, 170, 1],
        palegreen: [152, 251, 152, 1],
        paleturquoise: [175, 238, 238, 1],
        palevioletred: [219, 112, 147, 1],
        papayawhip: [255, 239, 213, 1],
        peachpuff: [255, 218, 185, 1],
        peru: [205, 133, 63, 1],
        pink: [255, 192, 203, 1],
        plum: [221, 160, 221, 1],
        powderblue: [176, 224, 230, 1],
        purple: [128, 0, 128, 1],
        rebeccapurple: [102, 51, 153, 1],
        red: [255, 0, 0, 1],
        rosybrown: [188, 143, 143, 1],
        royalblue: [65, 105, 225, 1],
        saddlebrown: [139, 69, 19, 1],
        salmon: [250, 128, 114, 1],
        sandybrown: [244, 164, 96, 1],
        seagreen: [46, 139, 87, 1],
        seashell: [255, 245, 238, 1],
        sienna: [160, 82, 45, 1],
        silver: [192, 192, 192, 1],
        skyblue: [135, 206, 235, 1],
        slateblue: [106, 90, 205, 1],
        slategray: [112, 128, 144, 1],
        slategrey: [112, 128, 144, 1],
        snow: [255, 250, 250, 1],
        springgreen: [0, 255, 127, 1],
        steelblue: [70, 130, 180, 1],
        tan: [210, 180, 140, 1],
        teal: [0, 128, 128, 1],
        thistle: [216, 191, 216, 1],
        tomato: [255, 99, 71, 1],
        turquoise: [64, 224, 208, 1],
        violet: [238, 130, 238, 1],
        wheat: [245, 222, 179, 1],
        white: [255, 255, 255, 1],
        whitesmoke: [245, 245, 245, 1],
        yellow: [255, 255, 0, 1],
        yellowgreen: [154, 205, 50, 1],
      };
      function clamp_css_byte(i) {
        return (i = Math.round(i)) < 0 ? 0 : 255 < i ? 255 : i;
      }
      function clamp_css_float(f) {
        return f < 0 ? 0 : 1 < f ? 1 : f;
      }
      function parse_css_int(str) {
        return "%" === str[str.length - 1]
          ? clamp_css_byte((parseFloat(str) / 100) * 255)
          : clamp_css_byte(parseInt(str));
      }
      function parse_css_float(str) {
        return "%" === str[str.length - 1]
          ? clamp_css_float(parseFloat(str) / 100)
          : clamp_css_float(parseFloat(str));
      }
      function css_hue_to_rgb(m1, m2, h) {
        return (
          h < 0 ? (h += 1) : 1 < h && --h,
          6 * h < 1
            ? m1 + (m2 - m1) * h * 6
            : 2 * h < 1
            ? m2
            : 3 * h < 2
            ? m1 + (m2 - m1) * (2 / 3 - h) * 6
            : m1
        );
      }
      try {
        exports.parseCSSColor = function (ep) {
          var str = ep.replace(/ /g, "").toLowerCase();
          if (str in kCSSColorTable) return kCSSColorTable[str].slice();
          if ("#" === str[0])
            return 4 === str.length
              ? 0 <= (fname = parseInt(str.substr(1), 16)) && fname <= 4095
                ? [
                    ((3840 & fname) >> 4) | ((3840 & fname) >> 8),
                    (240 & fname) | ((240 & fname) >> 4),
                    (15 & fname) | ((15 & fname) << 4),
                    1,
                  ]
                : null
              : 7 === str.length &&
                0 <= (fname = parseInt(str.substr(1), 16)) &&
                fname <= 16777215
              ? [(16711680 & fname) >> 16, (65280 & fname) >> 8, 255 & fname, 1]
              : null;
          var op = str.indexOf("("),
            ep = str.indexOf(")");
          if (-1 !== op && ep + 1 === str.length) {
            var fname = str.substr(0, op),
              params = str.substr(op + 1, ep - (op + 1)).split(","),
              alpha = 1;
            switch (fname) {
              case "rgba":
                if (4 !== params.length) return null;
                alpha = parse_css_float(params.pop());
              case "rgb":
                return 3 !== params.length
                  ? null
                  : [
                      parse_css_int(params[0]),
                      parse_css_int(params[1]),
                      parse_css_int(params[2]),
                      alpha,
                    ];
              case "hsla":
                if (4 !== params.length) return null;
                alpha = parse_css_float(params.pop());
              case "hsl":
                if (3 !== params.length) return null;
                var h = (((parseFloat(params[0]) % 360) + 360) % 360) / 360,
                  m2 = parse_css_float(params[1]),
                  m1 = parse_css_float(params[2]),
                  m2 = m1 <= 0.5 ? m1 * (m2 + 1) : m1 + m2 - m1 * m2,
                  m1 = 2 * m1 - m2;
                return [
                  clamp_css_byte(255 * css_hue_to_rgb(m1, m2, h + 1 / 3)),
                  clamp_css_byte(255 * css_hue_to_rgb(m1, m2, h)),
                  clamp_css_byte(255 * css_hue_to_rgb(m1, m2, h - 1 / 3)),
                  alpha,
                ];
              default:
                return null;
            }
          }
          return null;
        };
      } catch (e) {}
    }),
    colorhelper =
      (csscolorparser.parseCSSColor,
      createCommonjsModule(function (module, exports) {
        Object.defineProperty(exports, "__esModule", { value: !0 });
        var obj,
          _slicedToArray = function (arr, i) {
            if (Array.isArray(arr)) return arr;
            if (Symbol.iterator in Object(arr))
              return (function (arr, i) {
                var _arr = [],
                  _n = !0,
                  _d = !1,
                  _e = void 0;
                try {
                  for (
                    var _s, _i = arr[Symbol.iterator]();
                    !(_n = (_s = _i.next()).done) &&
                    (_arr.push(_s.value), !i || _arr.length !== i);
                    _n = !0
                  );
                } catch (err) {
                  (_d = !0), (_e = err);
                } finally {
                  try {
                    !_n && _i.return && _i.return();
                  } finally {
                    if (_d) throw _e;
                  }
                }
                return _arr;
              })(arr, i);
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance"
            );
          },
          _csscolorparser2 =
            (obj = csscolorparser) && obj.__esModule ? obj : { default: obj };
        var parseCSSColor = _csscolorparser2.default.parseCSSColor;
        function _clamp_css_byte(i) {
          return (i = Math.round(i)) < 0 ? 0 : 255 < i ? 255 : i;
        }
        function _clamp_css_float(f) {
          return f < 0 ? 0 : 1 < f ? 1 : f;
        }
        var ColorHelper = {
          isColor: function (color) {
            if ("string" == typeof color)
              return !!(0, _csscolorparser2.default)(color);
            if (Array.isArray(color)) {
              for (var i = 0, len = color.length; i < len; ) {
                var c = color[i++];
                if ("string" != typeof c) return !1;
                if (!parseCSSColor(c)) return !1;
              }
              return !0;
            }
            return !1;
          },
          toColorIncrease: function (inc) {
            return [inc[0] || 0, inc[1] || 0, inc[2] || 0, inc[3] || 0];
          },
          toNormal: function (color) {
            if (Array.isArray(color)) {
              for (var colorArr = [], i = 0, len = color.length; i < len; ) {
                var cssColor = color[i++];
                if ("string" != typeof cssColor) return null;
                cssColor = parseCSSColor(cssColor);
                if (!cssColor) return null;
                colorArr.push(cssColor);
              }
              return colorArr;
            }
            return "string" == typeof color ? parseCSSColor(color) : null;
          },
          toNormalArray: function (color) {
            if (Array.isArray(color)) {
              for (var colorArr = [], i = 0, len = color.length; i < len; ) {
                var cssColor = color[i++];
                if ("string" != typeof cssColor) return null;
                cssColor = parseCSSColor(cssColor);
                if (!cssColor) return null;
                colorArr.push(cssColor);
              }
              return colorArr;
            }
            return "string" == typeof color ? [parseCSSColor(color)] : null;
          },
          linearGradient: function (steps) {
            var i =
                1 < arguments.length && void 0 !== arguments[1]
                  ? arguments[1]
                  : 0,
              interpolation =
                2 < arguments.length && void 0 !== arguments[2]
                  ? arguments[2]
                  : ColorHelper.Utils.Linear,
              m = steps.length - 1,
              f = m * i,
              i = f >> 0,
              fn = interpolation;
            return (function (r1, b1, t) {
              var g1 = _slicedToArray(r1, 4),
                r0 = g1[0],
                g0 = g1[1],
                b0 = g1[2],
                a0 = g1[3],
                a1 = _slicedToArray(b1, 4),
                r1 = a1[0],
                g1 = a1[1],
                b1 = a1[2],
                a1 = a1[3];
              return [
                fn(r0, r1, t) >> 0,
                fn(g0, g1, t) >> 0,
                fn(b0, b1, t) >> 0,
                fn(a0, a1, t),
              ];
            })(steps[i], steps[m < 1 + i ? m : 1 + i], f - i);
          },
          mixColors: function (color, _ref) {
            var c = this.toNormal(color);
            if (Array.isArray(_ref) && c) {
              _ref = [
                _clamp_css_byte(c[0] + _ref[0] || 0),
                _clamp_css_byte(c[1] + _ref[1] || 0),
                _clamp_css_byte(c[2] + _ref[2] || 0),
                _clamp_css_float(c[3] + _ref[3] || 0),
              ];
              return (
                "rgba(" + [_ref[0], _ref[1], _ref[2], _ref[3]].join(",") + ")"
              );
            }
            return color;
          },
          toRGBA: function (color) {
            if (color && 3 <= color.length) {
              var alpha = void 0 === color[3] ? 1 : color[3];
              return (
                "rgba(" +
                _clamp_css_byte(color[0]) +
                "," +
                _clamp_css_byte(color[1]) +
                "," +
                _clamp_css_byte(color[2]) +
                "," +
                _clamp_css_float(alpha) +
                ")"
              );
            }
            return "transparent";
          },
          Utils: {
            Linear: function (p0, p1, t) {
              return (p1 - p0) * t + p0;
            },
          },
        };
        exports.default = ColorHelper;
      }));
  unwrapExports(colorhelper),
    unwrapExports(
      createCommonjsModule(function (module, exports) {
        Object.defineProperty(exports, "__esModule", { value: !0 });
        var _clip2 = _interopRequireDefault(clip),
          _colorhelper2 = _interopRequireDefault(colorhelper);
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }
        var plugin = {
          type: "color",
          test: function (value, key) {
            return _colorhelper2.default.isColor(value);
          },
          parse: function (value, key) {
            return _colorhelper2.default.toNormalArray(value);
          },
          valueOf: function (parsedValue, val, elapsed, key) {
            val = _colorhelper2.default.linearGradient(parsedValue, val);
            return (val = _colorhelper2.default.toRGBA(val));
          },
        };
        _clip2.default.registerPlugin(plugin), (exports.default = plugin);
      })
    );
  var vector_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var ArrayCons = "undefined" == typeof Float32Array ? Array : Float32Array,
      vector = {
        create: function () {
          var x =
              0 < arguments.length && void 0 !== arguments[0]
                ? arguments[0]
                : 0,
            y =
              1 < arguments.length && void 0 !== arguments[1]
                ? arguments[1]
                : 0,
            out = new ArrayCons(2);
          return (out[0] = x), (out[1] = y), out;
        },
        copy: function (out, v) {
          return (out[0] = v[0]), (out[1] = v[1]), out;
        },
        clone: function (v) {
          var out = new ArrayCons(2);
          return (out[0] = v[0]), (out[1] = v[1]), out;
        },
        set: function (out, x, y) {
          return (out[0] = x), (out[1] = y), out;
        },
        add: function (out, v1, v2) {
          return (out[0] = v1[0] + v2[0]), (out[1] = v1[1] + v2[1]), out;
        },
        scaleAndAdd: function (out, v1, v2, scale) {
          return (
            (out[0] = v1[0] + v2[0] * scale),
            (out[1] = v1[1] + v2[1] * scale),
            out
          );
        },
        sub: function (out, v1, v2) {
          return (out[0] = v1[0] - v2[0]), (out[1] = v1[1] - v2[1]), out;
        },
        length: function (v) {
          return Math.sqrt(this.lengthSquare(v));
        },
        lengthSquare: function (v) {
          return v[0] * v[0] + v[1] * v[1];
        },
        multiply: function (out, v1, v2) {
          return (out[0] = v1[0] * v2[0]), (out[1] = v1[1] * v2[1]), out;
        },
        divide: function (out, v1, v2) {
          return (out[0] = v1[0] / v2[0]), (out[1] = v1[1] / v2[1]), out;
        },
        dot: function (v1, v2) {
          return v1[0] * v2[0] + v1[1] * v2[1];
        },
        scale: function (out, v, s) {
          return (out[0] = v[0] * s), (out[1] = v[1] * s), out;
        },
        normalize: function (out, v) {
          var d = this.len(v);
          return (
            0 === d
              ? ((out[0] = 0), (out[1] = 0))
              : ((out[0] = v[0] / d), (out[1] = v[1] / d)),
            out
          );
        },
        distance: function (v1, v2) {
          return Math.sqrt(this.distanceSquare(v1, v2));
        },
        distanceSquare: function (v1, v2) {
          return (
            (v1[0] - v2[0]) * (v1[0] - v2[0]) +
            (v1[1] - v2[1]) * (v1[1] - v2[1])
          );
        },
        negate: function (out, v) {
          return (out[0] = -v[0]), (out[1] = -v[1]), out;
        },
        lerp: function (out, v1, v2, t) {
          return (
            (out[0] = v1[0] + t * (v2[0] - v1[0])),
            (out[1] = v1[1] + t * (v2[1] - v1[1])),
            out
          );
        },
        applyTransform: function (out, y, m) {
          var x = y[0],
            y = y[1];
          return (
            (out[0] = m[0] * x + m[2] * y + m[4]),
            (out[1] = m[1] * x + m[3] * y + m[5]),
            out
          );
        },
        min: function (out, v1, v2) {
          return (
            (out[0] = Math.min(v1[0], v2[0])),
            (out[1] = Math.min(v1[1], v2[1])),
            out
          );
        },
        max: function (out, v1, v2) {
          return (
            (out[0] = Math.max(v1[0], v2[0])),
            (out[1] = Math.max(v1[1], v2[1])),
            out
          );
        },
        getAngle: function (v1, v2) {
          var angle = 0;
          return (angle =
            0 != v1[0] - v2[0]
              ? Math.atan2(v1[1] - v2[1], v1[0] - v2[0])
              : angle);
        },
      };
    (vector.len = vector.length),
      (vector.lenSquare = vector.lengthSquare),
      (vector.dist = vector.distance),
      (vector.distSquare = vector.distanceSquare),
      (exports.default = vector);
  });
  unwrapExports(vector_1),
    unwrapExports(
      createCommonjsModule(function (module, exports) {
        Object.defineProperty(exports, "__esModule", { value: !0 });
        var _slicedToArray = function (arr, i) {
            if (Array.isArray(arr)) return arr;
            if (Symbol.iterator in Object(arr))
              return (function (arr, i) {
                var _arr = [],
                  _n = !0,
                  _d = !1,
                  _e = void 0;
                try {
                  for (
                    var _s, _i = arr[Symbol.iterator]();
                    !(_n = (_s = _i.next()).done) &&
                    (_arr.push(_s.value), !i || _arr.length !== i);
                    _n = !0
                  );
                } catch (err) {
                  (_d = !0), (_e = err);
                } finally {
                  try {
                    !_n && _i.return && _i.return();
                  } finally {
                    if (_d) throw _e;
                  }
                }
                return _arr;
              })(arr, i);
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance"
            );
          },
          _clip2 = _interopRequireDefault(clip),
          _vector2 = _interopRequireDefault(vector_1);
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }
        var plugin = {
          type: "coordinate-2d",
          test: function (value, key) {
            var res = !1;
            if (Array.isArray(value))
              for (var i = -1, len = value.length; ++i < len; ) {
                var _ref,
                  x,
                  y = value[i];
                Array.isArray(y) &&
                  ((y = (_ref = [
                    +(x = (_ref = _slicedToArray(y, 2))[0]),
                    +(y = _ref[1]),
                  ])[1]),
                  (res =
                    "number" == typeof (x = _ref[0]) &&
                    "number" == typeof y &&
                    isFinite(x) &&
                    isFinite(y)));
              }
            return res;
          },
          parse: function (value, key) {
            for (var path = [], i = -1, len = value.length; ++i < len; ) {
              var _ref2 = value[i],
                _ref2 = _slicedToArray(_ref2, 2),
                _ref2 = [+_ref2[0], +_ref2[1]];
              path.push([_ref2[0], _ref2[1]]);
            }
            return (function (path) {
              for (
                var angle,
                  i = 0,
                  len = path.length,
                  length = 0,
                  _path = [],
                  steps = [];
                i < len - 1;

              ) {
                var p0 = path[i],
                  p1 = path[i + 1],
                  segmentLength = _vector2.default.distance(p0, p1);
                (length += segmentLength),
                  (angle = _vector2.default.getAngle(p1, p0)),
                  _path.push(p0),
                  steps.push({
                    length: length,
                    segmentLength: segmentLength,
                    segment: [p0.slice(), p1.slice()],
                    path: _path.slice(),
                    angle: angle,
                  }),
                  i++;
              }
              return (steps.sum = length), steps;
            })(path);
          },
          valueOf: function (steps, out, elapsed, key) {
            for (
              var current = steps.sum * out,
                i = -1,
                len = steps.length,
                step = steps[0];
              ++i < len;

            ) {
              var s = steps[i];
              if (current <= s.length) {
                step = s;
                break;
              }
            }
            var position = _slicedToArray(step.segment, 2),
              p0 = position[0],
              p1 = position[1],
              scale =
                (0 == i ? current : current - steps[i - 1].length) /
                step.segmentLength,
              out = _vector2.default.create(),
              position = _vector2.default.create();
            return (
              _vector2.default.sub(out, p1, p0),
              _vector2.default.scaleAndAdd(position, p0, out, scale),
              (position.step = step),
              position
            );
          },
        };
        _clip2.default.registerPlugin(plugin), (exports.default = plugin);
      })
    );
  var d1,
    d2,
    r,
    Set = createCommonjsModule(function (module) {
      var Animation = core.Animation,
        Clip = core.Clip;
      (module.exports.default = { Animation: Animation, Clip: Clip }),
        (module.exports.Animation = Animation),
        (module.exports.Clip = Clip);
    }),
    chito_1 = Set.Animation,
    chito_2 = Set.Clip,
    projections = {},
    DataView = (function () {
      function Projection(id, project, unproject, getResolution) {
        (this.project = project),
          (this.unproject = unproject),
          (this.getResolution = getResolution),
          (projections[id] = this);
      }
      return (
        (Projection.prototype.moveWithPixel = function (
          pos,
          offsetPixel,
          offsetX
        ) {
          var offsetY = this.getResolution(offsetX),
            offsetX = offsetPixel[0] * offsetY,
            offsetY = offsetPixel[1] * offsetY,
            pos = this.project(pos[0], pos[1]);
          return this.unproject(pos[0] + offsetX, pos[1] + offsetY);
        }),
        (Projection.prototype.moveWithPos = function (originPos, newPos) {
          (originPos = this.project(originPos[0], originPos[1])),
            (newPos = [originPos[0] + newPos[0], originPos[1] + newPos[1]]);
          return this.unproject(newPos[0], newPos[1]);
        }),
        Projection
      );
    })(),
    ProjectionManager = {
      getProjection: function (id) {
        return projections[id];
      },
    };
  new DataView(
    "EPSG:4326",
    function (lng, lat) {
      return [lng, lat];
    },
    function (x, y) {
      return [x, y];
    },
    function (zoom) {
      return 0.703125 / Math.pow(2, zoom);
    }
  ),
    (d1 = Math.PI / 180),
    (d2 = 180 / Math.PI),
    (r = 6378137),
    new DataView(
      "EPSG:3857",
      function (x, y) {
        y = Math.max(Math.min(85.0511287798, y), -85.0511287798);
        (x *= d1), (y *= d1), (y = Math.log(Math.tan(Math.PI / 4 + y / 2)));
        return [x * r, y * r];
      },
      function (x, y) {
        return [
          (x / r) * d2,
          (2 * Math.atan(Math.exp(y / r)) - Math.PI / 2) * d2,
        ];
      },
      function (zoom) {
        return 156543.03392804097 / Math.pow(2, zoom);
      }
    );
  var Promise =
      "object" == typeof global && global && global.Object === Object && global,
    WeakMap = "object" == typeof self && self && self.Object === Object && self,
    GeometryUtilInstance = Promise || WeakMap || Function("return this")(),
    animationPlugin = GeometryUtilInstance.Symbol,
    getTag = Object.prototype,
    hasOwnProperty = getTag.hasOwnProperty,
    nativeObjectToString = getTag.toString,
    symToStringTag = animationPlugin ? animationPlugin.toStringTag : void 0;
  var nativeObjectToString$1 = Object.prototype.toString;
  var nullTag = "[object Null]",
    undefinedTag = "[object Undefined]",
    symToStringTag$1 = animationPlugin ? animationPlugin.toStringTag : void 0;
  function baseGetTag(value) {
    return null == value
      ? void 0 === value
        ? undefinedTag
        : nullTag
      : (symToStringTag$1 && symToStringTag$1 in Object(value)
          ? function (value) {
              var isOwn = hasOwnProperty.call(value, symToStringTag),
                tag = value[symToStringTag];
              try {
                var unmasked = !(value[symToStringTag] = void 0);
              } catch (e) {}
              var result = nativeObjectToString.call(value);
              return (
                unmasked &&
                  (isOwn
                    ? (value[symToStringTag] = tag)
                    : delete value[symToStringTag]),
                result
              );
            }
          : function (value) {
              return nativeObjectToString$1.call(value);
            })(value);
  }
  function isObjectLike(value) {
    return null != value && "object" == typeof value;
  }
  var isArray = Array.isArray;
  function isObject(value) {
    var type = typeof value;
    return null != value && ("object" == type || "function" == type);
  }
  function identity(value) {
    return value;
  }
  var asyncTag = "[object AsyncFunction]",
    funcTag = "[object Function]",
    genTag = "[object GeneratorFunction]",
    proxyTag = "[object Proxy]";
  function isFunction(tag) {
    if (isObject(tag)) {
      tag = baseGetTag(tag);
      return (
        tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag
      );
    }
  }
  var Set = GeometryUtilInstance["__core-js_shared__"],
    maskSrcKey = (DataView = /[^.]+$/.exec(
      (Set && Set.keys && Set.keys.IE_PROTO) || ""
    ))
      ? "Symbol(src)_1." + DataView
      : "";
  var funcToString = Function.prototype.toString;
  function toSource(func) {
    if (null != func) {
      try {
        return funcToString.call(func);
      } catch (e) {}
      try {
        return func + "";
      } catch (e) {}
    }
    return "";
  }
  var reIsHostCtor = /^\\[object .+?Constructor\\]$/,
    WeakMap = Function.prototype,
    getTag = Object.prototype,
    Set = WeakMap.toString,
    DataView = getTag.hasOwnProperty,
    reIsNative = RegExp(
      "^" +
        Set.call(DataView)
          .replace(/[\\\\^$.*+?()[\\]{}|]/g, "\\\\$&")
          .replace(
            /hasOwnProperty|(function).*?(?=\\\\\\()| for .+?(?=\\\\\\])/g,
            "$1.*?"
          ) +
        "$"
    );
  function baseIsNative(value) {
    var func;
    return (
      isObject(value) &&
      ((func = value), !(maskSrcKey && maskSrcKey in func)) &&
      (isFunction(value) ? reIsNative : reIsHostCtor).test(toSource(value))
    );
  }
  function getNative(object, value) {
    value = (function (object, key) {
      return null == object ? void 0 : object[key];
    })(object, value);
    return baseIsNative(value) ? value : void 0;
  }
  WeakMap = getNative(GeometryUtilInstance, "WeakMap");
  var nativeNow = Date.now;
  var func,
    count,
    lastCalled,
    defineProperty = (function () {
      try {
        var func = getNative(Object, "defineProperty");
        return func({}, "", {}), func;
      } catch (e) {}
    })(),
    setToString =
      ((func = defineProperty
        ? function (func, string) {
            return defineProperty(func, "toString", {
              configurable: !0,
              enumerable: !1,
              value:
                ((value = string),
                function () {
                  return value;
                }),
              writable: !0,
            });
            var value;
          }
        : identity),
      (lastCalled = count = 0),
      function () {
        var stamp = nativeNow(),
          remaining = 16 - (stamp - lastCalled);
        if (((lastCalled = stamp), 0 < remaining)) {
          if (800 <= ++count) return arguments[0];
        } else count = 0;
        return func.apply(void 0, arguments);
      }),
    MAX_SAFE_INTEGER = 9007199254740991,
    reIsUint = /^(?:0|[1-9]\\d*)$/;
  function isIndex(value, length) {
    var type = typeof value;
    return (
      (length = null == length ? MAX_SAFE_INTEGER : length) &&
      ("number" == type || ("symbol" != type && reIsUint.test(value))) &&
      -1 < value &&
      value % 1 == 0 &&
      value < length
    );
  }
  function baseAssignValue(object, key, value) {
    "__proto__" == key && defineProperty
      ? defineProperty(object, key, {
          configurable: !0,
          enumerable: !0,
          value: value,
          writable: !0,
        })
      : (object[key] = value);
  }
  function eq(value, other) {
    return value === other || (value != value && other != other);
  }
  var hasOwnProperty$2 = Object.prototype.hasOwnProperty;
  function assignValue(object, key, value) {
    var objValue = object[key];
    (hasOwnProperty$2.call(object, key) &&
      eq(objValue, value) &&
      (void 0 !== value || key in object)) ||
      baseAssignValue(object, key, value);
  }
  var nativeMax = Math.max;
  function overRest(func, start, transform) {
    return (
      (start = nativeMax(void 0 === start ? func.length - 1 : start, 0)),
      function () {
        for (
          var args = arguments,
            index = -1,
            length = nativeMax(args.length - start, 0),
            array = Array(length);
          ++index < length;

        )
          array[index] = args[start + index];
        for (var index = -1, otherArgs = Array(start + 1); ++index < start; )
          otherArgs[index] = args[index];
        return (
          (otherArgs[start] = transform(array)),
          (function (func, thisArg, args) {
            switch (args.length) {
              case 0:
                return func.call(thisArg);
              case 1:
                return func.call(thisArg, args[0]);
              case 2:
                return func.call(thisArg, args[0], args[1]);
              case 3:
                return func.call(thisArg, args[0], args[1], args[2]);
            }
            return func.apply(thisArg, args);
          })(func, this, otherArgs)
        );
      }
    );
  }
  var MAX_SAFE_INTEGER$1 = 9007199254740991;
  function isLength(value) {
    return (
      "number" == typeof value &&
      -1 < value &&
      value % 1 == 0 &&
      value <= MAX_SAFE_INTEGER$1
    );
  }
  function isArrayLike(value) {
    return null != value && isLength(value.length) && !isFunction(value);
  }
  var objectProto$4 = Object.prototype;
  function isPrototype(value) {
    var Ctor = value && value.constructor;
    return (
      value === (("function" == typeof Ctor && Ctor.prototype) || objectProto$4)
    );
  }
  function baseIsArguments(value) {
    return isObjectLike(value) && "[object Arguments]" == baseGetTag(value);
  }
  var getTag = Object.prototype,
    hasOwnProperty$3 = getTag.hasOwnProperty,
    propertyIsEnumerable = getTag.propertyIsEnumerable,
    isArguments = baseIsArguments(
      (function () {
        return arguments;
      })()
    )
      ? baseIsArguments
      : function (value) {
          return (
            isObjectLike(value) &&
            hasOwnProperty$3.call(value, "callee") &&
            !propertyIsEnumerable.call(value, "callee")
          );
        };
  var Set =
      "object" == typeof exports && exports && !exports.nodeType && exports,
    DataView =
      Set && "object" == typeof module && module && !module.nodeType && module,
    getTag =
      DataView && DataView.exports === Set
        ? GeometryUtilInstance.Buffer
        : void 0,
    isBuffer =
      (getTag ? getTag.isBuffer : void 0) ||
      function () {
        return !1;
      },
    typedArrayTags = {};
  (typedArrayTags["[object Float32Array]"] =
    typedArrayTags["[object Float64Array]"] =
    typedArrayTags["[object Int8Array]"] =
    typedArrayTags["[object Int16Array]"] =
    typedArrayTags["[object Int32Array]"] =
    typedArrayTags["[object Uint8Array]"] =
    typedArrayTags["[object Uint8ClampedArray]"] =
    typedArrayTags["[object Uint16Array]"] =
    typedArrayTags["[object Uint32Array]"] =
      !0),
    (typedArrayTags["[object Arguments]"] =
      typedArrayTags["[object Array]"] =
      typedArrayTags["[object ArrayBuffer]"] =
      typedArrayTags["[object Boolean]"] =
      typedArrayTags["[object DataView]"] =
      typedArrayTags["[object Date]"] =
      typedArrayTags["[object Error]"] =
      typedArrayTags["[object Function]"] =
      typedArrayTags["[object Map]"] =
      typedArrayTags["[object Number]"] =
      typedArrayTags["[object Object]"] =
      typedArrayTags["[object RegExp]"] =
      typedArrayTags["[object Set]"] =
      typedArrayTags["[object String]"] =
      typedArrayTags["[object WeakMap]"] =
        !1);
  var DataView =
      "object" == typeof exports && exports && !exports.nodeType && exports,
    freeModule$1 =
      DataView &&
      "object" == typeof module &&
      module &&
      !module.nodeType &&
      module,
    freeProcess =
      freeModule$1 && freeModule$1.exports === DataView && Promise.process,
    Set = (function () {
      try {
        var types =
          freeModule$1 &&
          freeModule$1.require &&
          freeModule$1.require("util").types;
        return types
          ? types
          : freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {}
    })(),
    getTag = Set && Set.isTypedArray,
    isTypedArray = getTag
      ? (function (func) {
          return function (value) {
            return func(value);
          };
        })(getTag)
      : function (value) {
          return (
            isObjectLike(value) &&
            isLength(value.length) &&
            !!typedArrayTags[baseGetTag(value)]
          );
        },
    hasOwnProperty$4 = Object.prototype.hasOwnProperty;
  function arrayLikeKeys(value, inherited) {
    var key,
      isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes
        ? (function (n, iteratee) {
            for (var index = -1, result = Array(n); ++index < n; )
              result[index] = iteratee(index);
            return result;
          })(value.length, String)
        : [],
      length = result.length;
    for (key in value)
      (!inherited && !hasOwnProperty$4.call(value, key)) ||
        (skipIndexes &&
          ("length" == key ||
            (isBuff && ("offset" == key || "parent" == key)) ||
            (isType &&
              ("buffer" == key ||
                "byteLength" == key ||
                "byteOffset" == key)) ||
            isIndex(key, length))) ||
        result.push(key);
    return result;
  }
  var nativeKeys = (function (func, transform) {
      return function (arg) {
        return func(transform(arg));
      };
    })(Object.keys, Object),
    hasOwnProperty$5 = Object.prototype.hasOwnProperty;
  function keys(object) {
    return (
      isArrayLike(object)
        ? arrayLikeKeys
        : function (object) {
            if (!isPrototype(object)) return nativeKeys(object);
            var key,
              result = [];
            for (key in Object(object))
              hasOwnProperty$5.call(object, key) &&
                "constructor" != key &&
                result.push(key);
            return result;
          }
    )(object);
  }
  var hasOwnProperty$6 = Object.prototype.hasOwnProperty,
    assign = (function (assigner) {
      return setToString(
        overRest(
          (func = function (object, sources) {
            var index = -1,
              length = sources.length,
              customizer = 1 < length ? sources[length - 1] : void 0,
              guard = 2 < length ? sources[2] : void 0,
              customizer =
                3 < assigner.length && "function" == typeof customizer
                  ? (length--, customizer)
                  : void 0;
            for (
              guard &&
                (function (value, index, object) {
                  if (isObject(object)) {
                    var type = typeof index;
                    return (
                      ("number" == type
                        ? isArrayLike(object) && isIndex(index, object.length)
                        : "string" == type && (index in object)) &&
                      eq(object[index], value)
                    );
                  }
                })(sources[0], sources[1], guard) &&
                ((customizer = length < 3 ? void 0 : customizer), (length = 1)),
                object = Object(object);
              ++index < length;

            ) {
              var source = sources[index];
              source && assigner(object, source, index, customizer);
            }
            return object;
          }),
          start,
          identity
        ),
        func + ""
      );
      var func, start;
    })(function (object, source) {
      if (isPrototype(source) || isArrayLike(source))
        !(function (source, props, object, customizer) {
          var isNew = !object;
          object = object || {};
          for (var index = -1, length = props.length; ++index < length; ) {
            var key = props[index],
              newValue = customizer
                ? customizer(object[key], source[key], key, object, source)
                : void 0;
            (isNew ? baseAssignValue : assignValue)(
              object,
              key,
              (newValue = void 0 === newValue ? source[key] : newValue)
            );
          }
        })(source, keys(source), object);
      else
        for (var key in source)
          hasOwnProperty$6.call(source, key) &&
            assignValue(object, key, source[key]);
    }),
    nativeCreate = getNative(Object, "create");
  var hasOwnProperty$7 = Object.prototype.hasOwnProperty;
  var hasOwnProperty$8 = Object.prototype.hasOwnProperty;
  function Hash(entries) {
    var index = -1,
      length = null == entries ? 0 : entries.length;
    for (this.clear(); ++index < length; ) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function assocIndexOf(array, key) {
    for (var length = array.length; length--; )
      if (eq(array[length][0], key)) return length;
    return -1;
  }
  (Hash.prototype.clear = function () {
    (this.__data__ = nativeCreate ? nativeCreate(null) : {}), (this.size = 0);
  }),
    (Hash.prototype.delete = function (result) {
      return (
        (result = this.has(result) && delete this.__data__[result]),
        (this.size -= result ? 1 : 0),
        result
      );
    }),
    (Hash.prototype.get = function (key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return "__lodash_hash_undefined__" === result ? void 0 : result;
      }
      return hasOwnProperty$7.call(data, key) ? data[key] : void 0;
    }),
    (Hash.prototype.has = function (key) {
      var data = this.__data__;
      return nativeCreate
        ? void 0 !== data[key]
        : hasOwnProperty$8.call(data, key);
    }),
    (Hash.prototype.set = function (key, value) {
      var data = this.__data__;
      return (
        (this.size += this.has(key) ? 0 : 1),
        (data[key] =
          nativeCreate && void 0 === value
            ? "__lodash_hash_undefined__"
            : value),
        this
      );
    });
  var splice = Array.prototype.splice;
  function ListCache(entries) {
    var index = -1,
      length = null == entries ? 0 : entries.length;
    for (this.clear(); ++index < length; ) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  (ListCache.prototype.clear = function () {
    (this.__data__ = []), (this.size = 0);
  }),
    (ListCache.prototype.delete = function (index) {
      var data = this.__data__;
      return (
        !((index = assocIndexOf(data, index)) < 0) &&
        (index == data.length - 1 ? data.pop() : splice.call(data, index, 1),
        --this.size,
        !0)
      );
    }),
    (ListCache.prototype.get = function (index) {
      var data = this.__data__;
      return (index = assocIndexOf(data, index)) < 0 ? void 0 : data[index][1];
    }),
    (ListCache.prototype.has = function (key) {
      return -1 < assocIndexOf(this.__data__, key);
    }),
    (ListCache.prototype.set = function (key, value) {
      var data = this.__data__,
        index = assocIndexOf(data, key);
      return (
        index < 0
          ? (++this.size, data.push([key, value]))
          : (data[index][1] = value),
        this
      );
    });
  var Map = getNative(GeometryUtilInstance, "Map");
  function getMapData(type, key) {
    var value,
      data = type.__data__;
    return (
      "string" == (type = typeof (value = key)) ||
      "number" == type ||
      "symbol" == type ||
      "boolean" == type
        ? "__proto__" !== value
        : null === value
    )
      ? data["string" == typeof key ? "string" : "hash"]
      : data.map;
  }
  function MapCache(entries) {
    var index = -1,
      length = null == entries ? 0 : entries.length;
    for (this.clear(); ++index < length; ) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  (MapCache.prototype.clear = function () {
    (this.size = 0),
      (this.__data__ = {
        hash: new Hash(),
        map: new (Map || ListCache)(),
        string: new Hash(),
      });
  }),
    (MapCache.prototype.delete = function (result) {
      return (
        (result = getMapData(this, result).delete(result)),
        (this.size -= result ? 1 : 0),
        result
      );
    }),
    (MapCache.prototype.get = function (key) {
      return getMapData(this, key).get(key);
    }),
    (MapCache.prototype.has = function (key) {
      return getMapData(this, key).has(key);
    }),
    (MapCache.prototype.set = function (key, value) {
      var data = getMapData(this, key),
        size = data.size;
      return (
        data.set(key, value), (this.size += data.size == size ? 0 : 1), this
      );
    });
  function Stack(data) {
    data = this.__data__ = new ListCache(data);
    this.size = data.size;
  }
  (Stack.prototype.clear = function () {
    (this.__data__ = new ListCache()), (this.size = 0);
  }),
    (Stack.prototype.delete = function (result) {
      var data = this.__data__,
        result = data.delete(result);
      return (this.size = data.size), result;
    }),
    (Stack.prototype.get = function (key) {
      return this.__data__.get(key);
    }),
    (Stack.prototype.has = function (key) {
      return this.__data__.has(key);
    }),
    (Stack.prototype.set = function (key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map || pairs.length < 199)
          return pairs.push([key, value]), (this.size = ++data.size), this;
        data = this.__data__ = new MapCache(pairs);
      }
      return data.set(key, value), (this.size = data.size), this;
    });
  var propertyIsEnumerable$1 = Object.prototype.propertyIsEnumerable,
    nativeGetSymbols = Object.getOwnPropertySymbols,
    getSymbols = nativeGetSymbols
      ? function (object) {
          return null == object
            ? []
            : ((object = Object(object)),
              (function (array, predicate) {
                for (
                  var index = -1,
                    length = null == array ? 0 : array.length,
                    resIndex = 0,
                    result = [];
                  ++index < length;

                ) {
                  var value = array[index];
                  predicate(value, index, array) &&
                    (result[resIndex++] = value);
                }
                return result;
              })(nativeGetSymbols(object), function (symbol) {
                return propertyIsEnumerable$1.call(object, symbol);
              }));
        }
      : function () {
          return [];
        };
  function baseGetAllKeys(object, result, symbolsFunc) {
    result = result(object);
    return isArray(object)
      ? result
      : (function (array, values) {
          for (
            var index = -1, length = values.length, offset = array.length;
            ++index < length;

          )
            array[offset + index] = values[index];
          return array;
        })(result, symbolsFunc(object));
  }
  function getAllKeys(object) {
    return baseGetAllKeys(object, keys, getSymbols);
  }
  var DataView = getNative(GeometryUtilInstance, "DataView"),
    Promise = getNative(GeometryUtilInstance, "Promise"),
    Set = getNative(GeometryUtilInstance, "Set"),
    dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap),
    getTag = baseGetTag,
    getTag$1 = (getTag =
      (DataView &&
        "[object DataView]" != getTag(new DataView(new ArrayBuffer(1)))) ||
      (Map && "[object Map]" != getTag(new Map())) ||
      (Promise && "[object Promise]" != getTag(Promise.resolve())) ||
      (Set && "[object Set]" != getTag(new Set())) ||
      (WeakMap && "[object WeakMap]" != getTag(new WeakMap()))
        ? function (ctorString) {
            var result = baseGetTag(ctorString),
              ctorString =
                "[object Object]" == result ? ctorString.constructor : void 0,
              ctorString = ctorString ? toSource(ctorString) : "";
            if (ctorString)
              switch (ctorString) {
                case dataViewCtorString:
                  return "[object DataView]";
                case mapCtorString:
                  return "[object Map]";
                case promiseCtorString:
                  return "[object Promise]";
                case setCtorString:
                  return "[object Set]";
                case weakMapCtorString:
                  return "[object WeakMap]";
              }
            return result;
          }
        : getTag),
    Uint8Array$1 = GeometryUtilInstance.Uint8Array;
  function SetCache(values) {
    var index = -1,
      length = null == values ? 0 : values.length;
    for (this.__data__ = new MapCache(); ++index < length; )
      this.add(values[index]);
  }
  (SetCache.prototype.add = SetCache.prototype.push =
    function (value) {
      return this.__data__.set(value, "__lodash_hash_undefined__"), this;
    }),
    (SetCache.prototype.has = function (value) {
      return this.__data__.has(value);
    });
  function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = 1 & bitmask,
      arrLength = array.length,
      othStacked = other.length;
    if (arrLength != othStacked && !(isPartial && arrLength < othStacked))
      return !1;
    var arrStacked = stack.get(array),
      othStacked = stack.get(other);
    if (arrStacked && othStacked)
      return arrStacked == other && othStacked == array;
    var index = -1,
      result = !0,
      seen = 2 & bitmask ? new SetCache() : void 0;
    for (
      stack.set(array, other), stack.set(other, array);
      ++index < arrLength;

    ) {
      var compared,
        arrValue = array[index],
        othValue = other[index];
      if (
        void 0 !==
        (compared = customizer
          ? isPartial
            ? customizer(othValue, arrValue, index, other, array, stack)
            : customizer(arrValue, othValue, index, array, other, stack)
          : compared)
      ) {
        if (compared) continue;
        result = !1;
        break;
      }
      if (seen) {
        if (
          !(function (array, predicate) {
            for (
              var index = -1, length = null == array ? 0 : array.length;
              ++index < length;

            )
              if (predicate(array[index], index, array)) return 1;
          })(other, function (othValue, othIndex) {
            return (
              !seen.has(othIndex) &&
              (arrValue === othValue ||
                equalFunc(arrValue, othValue, bitmask, customizer, stack)) &&
              seen.push(othIndex)
            );
          })
        ) {
          result = !1;
          break;
        }
      } else if (
        arrValue !== othValue &&
        !equalFunc(arrValue, othValue, bitmask, customizer, stack)
      ) {
        result = !1;
        break;
      }
    }
    return stack.delete(array), stack.delete(other), result;
  }
  function mapToArray(map) {
    var index = -1,
      result = Array(map.size);
    return (
      map.forEach(function (value, key) {
        result[++index] = [key, value];
      }),
      result
    );
  }
  function setToArray(set) {
    var index = -1,
      result = Array(set.size);
    return (
      set.forEach(function (value) {
        result[++index] = value;
      }),
      result
    );
  }
  var GeometryUtilInstance = animationPlugin
      ? animationPlugin.prototype
      : void 0,
    symbolValueOf = GeometryUtilInstance
      ? GeometryUtilInstance.valueOf
      : void 0;
  var hasOwnProperty$9 = Object.prototype.hasOwnProperty;
  var COMPARE_PARTIAL_FLAG$3 = 1,
    argsTag$2 = "[object Arguments]",
    arrayTag$1 = "[object Array]",
    objectTag$2 = "[object Object]",
    hasOwnProperty$a = Object.prototype.hasOwnProperty;
  function baseIsEqualDeep(
    object,
    other,
    bitmask,
    customizer,
    equalFunc,
    stack
  ) {
    var objIsArr = isArray(object),
      othIsWrapped = isArray(other),
      objTag = objIsArr ? arrayTag$1 : getTag$1(object),
      isSameTag = othIsWrapped ? arrayTag$1 : getTag$1(other),
      objIsWrapped =
        (objTag = objTag == argsTag$2 ? objectTag$2 : objTag) == objectTag$2,
      othIsWrapped =
        (isSameTag = isSameTag == argsTag$2 ? objectTag$2 : isSameTag) ==
        objectTag$2,
      isSameTag = objTag == isSameTag;
    if (isSameTag && isBuffer(object)) {
      if (!isBuffer(other)) return !1;
      objIsWrapped = !(objIsArr = !0);
    }
    if (isSameTag && !objIsWrapped)
      return (
        (stack = stack || new Stack()),
        objIsArr || isTypedArray(object)
          ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
          : (function (
              object,
              other,
              tag,
              bitmask,
              customizer,
              equalFunc,
              stack
            ) {
              switch (tag) {
                case "[object DataView]":
                  if (
                    object.byteLength != other.byteLength ||
                    object.byteOffset != other.byteOffset
                  )
                    return !1;
                  (object = object.buffer), (other = other.buffer);
                case "[object ArrayBuffer]":
                  return object.byteLength == other.byteLength &&
                    equalFunc(new Uint8Array$1(object), new Uint8Array$1(other))
                    ? !0
                    : !1;
                case "[object Boolean]":
                case "[object Date]":
                case "[object Number]":
                  return eq(+object, +other);
                case "[object Error]":
                  return (
                    object.name == other.name && object.message == other.message
                  );
                case "[object RegExp]":
                case "[object String]":
                  return object == other + "";
                case "[object Map]":
                  var result = mapToArray;
                case "[object Set]":
                  result = result || setToArray;
                  if (object.size != other.size && !(1 & bitmask)) return !1;
                  var stacked = stack.get(object);
                  if (stacked) return stacked == other;
                  (bitmask |= 2), stack.set(object, other);
                  result = equalArrays(
                    result(object),
                    result(other),
                    bitmask,
                    customizer,
                    equalFunc,
                    stack
                  );
                  return stack.delete(object), result;
                case "[object Symbol]":
                  if (symbolValueOf)
                    return (
                      symbolValueOf.call(object) == symbolValueOf.call(other)
                    );
              }
              return !1;
            })(object, other, objTag, bitmask, customizer, equalFunc, stack)
      );
    if (!(bitmask & COMPARE_PARTIAL_FLAG$3)) {
      (objIsWrapped =
        objIsWrapped && hasOwnProperty$a.call(object, "__wrapped__")),
        (othIsWrapped =
          othIsWrapped && hasOwnProperty$a.call(other, "__wrapped__"));
      if (objIsWrapped || othIsWrapped)
        return equalFunc(
          objIsWrapped ? object.value() : object,
          othIsWrapped ? other.value() : other,
          bitmask,
          customizer,
          (stack = stack || new Stack())
        );
    }
    return (
      !!isSameTag &&
      (function (object, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = 1 & bitmask,
          objProps = getAllKeys(object),
          objLength = objProps.length;
        if (objLength != getAllKeys(other).length && !isPartial) return !1;
        for (var index = objLength; index--; ) {
          var key = objProps[index];
          if (!(isPartial ? key in other : hasOwnProperty$9.call(other, key)))
            return !1;
        }
        var objCtor = stack.get(object),
          othCtor = stack.get(other);
        if (objCtor && othCtor) return objCtor == other && othCtor == object;
        var result = !0;
        stack.set(object, other), stack.set(other, object);
        for (var skipCtor = isPartial; ++index < objLength; ) {
          var compared,
            objValue = object[(key = objProps[index])],
            othValue = other[key];
          if (
            !(void 0 ===
            (compared = customizer
              ? isPartial
                ? customizer(othValue, objValue, key, other, object, stack)
                : customizer(objValue, othValue, key, object, other, stack)
              : compared)
              ? objValue === othValue ||
                equalFunc(objValue, othValue, bitmask, customizer, stack)
              : compared)
          ) {
            result = !1;
            break;
          }
          skipCtor = skipCtor || "constructor" == key;
        }
        return (
          !result ||
            skipCtor ||
            ((objCtor = object.constructor) != (othCtor = other.constructor) &&
              "constructor" in object &&
              "constructor" in other &&
              !(
                "function" == typeof objCtor &&
                objCtor instanceof objCtor &&
                "function" == typeof othCtor &&
                othCtor instanceof othCtor
              ) &&
              (result = !1)),
          stack.delete(object),
          stack.delete(other),
          result
        );
      })(
        object,
        other,
        bitmask,
        customizer,
        equalFunc,
        (stack = stack || new Stack())
      )
    );
  }
  function baseIsEqual(value, other, bitmask, customizer, stack) {
    return (
      value === other ||
      (null == value ||
      null == other ||
      (!isObjectLike(value) && !isObjectLike(other))
        ? value != value && other != other
        : baseIsEqualDeep(
            value,
            other,
            bitmask,
            customizer,
            baseIsEqual,
            stack
          ))
    );
  }
  function isEqual(value, other) {
    return baseIsEqual(value, other);
  }
  var Coordinate_closestOnSegment = function (x2, y2) {
      var x,
        x0 = x2[0],
        along = x2[1],
        dx = y2[0],
        y = y2[1],
        x1 = dx[0],
        y1 = dx[1],
        x2 = y[0],
        y2 = y[1],
        dx = x2 - x1,
        y = y2 - y1,
        along =
          0 == dx && 0 == y
            ? 0
            : (dx * (x0 - x1) + y * (along - y1)) / (dx * dx + y * y || 0),
        y =
          along <= 0
            ? ((x = x1), y1)
            : 1 <= along
            ? ((x = x2), y2)
            : ((x = x1 + along * dx), y1 + along * y);
      return [x, y];
    },
    Coordinate_containsCoordinate = function (
      coordinate,
      vertices,
      containBounds
    ) {
      for (
        var x = coordinate[0],
          y = coordinate[1],
          inside = !1,
          numVertices = vertices.length,
          i = 0,
          j = numVertices - 1;
        i < numVertices;
        j = i, i += 1
      ) {
        var intersect = !1,
          xx = vertices[i][0],
          yi = vertices[i][1],
          xj = vertices[j][0],
          yj = vertices[j][1];
        if ((xx === x && yi === y) || (xj === x && yj === y))
          return !!containBounds;
        if (yi < y == y <= yj) {
          xx = ((xj - xx) * (y - yi)) / (yj - yi) + xx;
          if (x === xx) return !!containBounds;
          intersect = x < xx;
        }
        intersect && (inside = !inside);
      }
      return inside;
    },
    Pixel = (function () {
      function Pixel(x, y, isRound) {
        if (
          (void 0 === isRound && (isRound = !1),
          (this.className = "AMap.Pixel"),
          isNaN(x) || isNaN(y))
        )
          throw new Error("Invalid Object: Pixel(" + x + ", " + y + ")");
        (this.x = isRound ? Math.round(x) : Number(x)),
          (this.y = isRound ? Math.round(y) : Number(y));
      }
      return (
        (Pixel.prototype.getX = function () {
          return this.x;
        }),
        (Pixel.prototype.round = function () {
          return new Pixel(Math.round(this.x), Math.round(this.y));
        }),
        (Pixel.prototype.getY = function () {
          return this.y;
        }),
        (Pixel.prototype.toString = function () {
          return this.x + "," + this.y;
        }),
        (Pixel.prototype.equals = function (point) {
          return (
            point instanceof Pixel &&
            Math.max(Math.abs(this.x - point.x), Math.abs(this.y - point.y)) <=
              1e-9
          );
        }),
        (Pixel.prototype.toArray = function () {
          return [this.x, this.y];
        }),
        (Pixel.prototype.subtract = function (other, isRound) {
          return new Pixel(this.x - other.x, this.y - other.y, isRound);
        }),
        (Pixel.prototype.multiplyBy = function (num, noWrap) {
          return new Pixel(this.x * num, this.y * num, noWrap);
        }),
        (Pixel.prototype.direction = function () {
          var x = this.x,
            y = this.y;
          if (0 === x && 0 === y) return null;
          if (0 === x) return 0 < y ? 90 : 270;
          var angle = (180 * Math.atan(y / x)) / Math.PI;
          return (x < 0 && 0 < y) || (x < 0 && y < 0)
            ? 180 + angle
            : 0 < x && y < 0
            ? 360 + angle
            : angle;
        }),
        (Pixel.prototype.toJSON = function () {
          return [this.x, this.y];
        }),
        Pixel
      );
    })(),
    martinez = unwrapExports(
      createCommonjsModule(function (module, exports) {
        !(function (exports) {
          function DEFAULT_COMPARE(a, b) {
            return a > b ? 1 : a < b ? -1 : 0;
          }
          var SplayTree = function SplayTree(compare, noDuplicates) {
              if (compare === void 0) compare = DEFAULT_COMPARE;
              if (noDuplicates === void 0) noDuplicates = false;
              this._compare = compare;
              this._root = null;
              this._size = 0;
              this._noDuplicates = !!noDuplicates;
            },
            prototypeAccessors = { size: { configurable: true } };
          function loadRecursive(parent, keys, values, start, end) {
            var size = end - start;
            if (size > 0) {
              var middle = start + Math.floor(size / 2);
              var key = keys[middle];
              var data = values[middle];
              var node = { key: key, data: data, parent: parent };
              node.left = loadRecursive(node, keys, values, start, middle);
              node.right = loadRecursive(node, keys, values, middle + 1, end);
              return node;
            }
            return null;
          }
          function sort(keys, values, left, right, compare) {
            if (left >= right) return;
            var pivot = keys[(left + right) >> 1];
            var i = left - 1;
            var j = right + 1;
            while (true) {
              do {
                i++;
              } while (compare(keys[i], pivot) < 0);
              do {
                j--;
              } while (compare(keys[j], pivot) > 0);
              if (i >= j) break;
              var tmp = keys[i];
              keys[i] = keys[j];
              keys[j] = tmp;
              tmp = values[i];
              values[i] = values[j];
              values[j] = tmp;
            }
            sort(keys, values, left, j, compare);
            sort(keys, values, j + 1, right, compare);
          }
          (SplayTree.prototype.rotateLeft = function rotateLeft(x) {
            var y = x.right;
            if (y) {
              x.right = y.left;
              if (y.left) y.left.parent = x;
              y.parent = x.parent;
            }
            if (!x.parent) this._root = y;
            else if (x === x.parent.left) x.parent.left = y;
            else x.parent.right = y;
            if (y) y.left = x;
            x.parent = y;
          }),
            (SplayTree.prototype.rotateRight = function rotateRight(x) {
              var y = x.left;
              if (y) {
                x.left = y.right;
                if (y.right) y.right.parent = x;
                y.parent = x.parent;
              }
              if (!x.parent) this._root = y;
              else if (x === x.parent.left) x.parent.left = y;
              else x.parent.right = y;
              if (y) y.right = x;
              x.parent = y;
            }),
            (SplayTree.prototype._splay = function _splay(x) {
              while (x.parent) {
                var p = x.parent;
                if (!p.parent)
                  if (p.left === x) this.rotateRight(p);
                  else this.rotateLeft(p);
                else if (p.left === x && p.parent.left === p) {
                  this.rotateRight(p.parent);
                  this.rotateRight(p);
                } else if (p.right === x && p.parent.right === p) {
                  this.rotateLeft(p.parent);
                  this.rotateLeft(p);
                } else if (p.left === x && p.parent.right === p) {
                  this.rotateRight(p);
                  this.rotateLeft(p);
                } else {
                  this.rotateLeft(p);
                  this.rotateRight(p);
                }
              }
            }),
            (SplayTree.prototype.splay = function splay(x) {
              var p, gp, ggp, l, r;
              while (x.parent) {
                p = x.parent;
                gp = p.parent;
                if (gp && gp.parent) {
                  ggp = gp.parent;
                  if (ggp.left === gp) ggp.left = x;
                  else ggp.right = x;
                  x.parent = ggp;
                } else {
                  x.parent = null;
                  this._root = x;
                }
                l = x.left;
                r = x.right;
                if (x === p.left) {
                  if (gp)
                    if (gp.left === p) {
                      if (p.right) {
                        gp.left = p.right;
                        gp.left.parent = gp;
                      } else gp.left = null;
                      p.right = gp;
                      gp.parent = p;
                    } else {
                      if (l) {
                        gp.right = l;
                        l.parent = gp;
                      } else gp.right = null;
                      x.left = gp;
                      gp.parent = x;
                    }
                  if (r) {
                    p.left = r;
                    r.parent = p;
                  } else p.left = null;
                  x.right = p;
                  p.parent = x;
                } else {
                  if (gp)
                    if (gp.right === p) {
                      if (p.left) {
                        gp.right = p.left;
                        gp.right.parent = gp;
                      } else gp.right = null;
                      p.left = gp;
                      gp.parent = p;
                    } else {
                      if (r) {
                        gp.left = r;
                        r.parent = gp;
                      } else gp.left = null;
                      x.right = gp;
                      gp.parent = x;
                    }
                  if (l) {
                    p.right = l;
                    l.parent = p;
                  } else p.right = null;
                  x.left = p;
                  p.parent = x;
                }
              }
            }),
            (SplayTree.prototype.replace = function replace(u, v) {
              if (!u.parent) this._root = v;
              else if (u === u.parent.left) u.parent.left = v;
              else u.parent.right = v;
              if (v) v.parent = u.parent;
            }),
            (SplayTree.prototype.minNode = function minNode(u) {
              if (u === void 0) u = this._root;
              if (u) while (u.left) u = u.left;
              return u;
            }),
            (SplayTree.prototype.maxNode = function maxNode(u) {
              if (u === void 0) u = this._root;
              if (u) while (u.right) u = u.right;
              return u;
            }),
            (SplayTree.prototype.insert = function insert(key, data) {
              var z = this._root;
              var p = null;
              var comp = this._compare;
              var cmp;
              if (this._noDuplicates)
                while (z) {
                  p = z;
                  cmp = comp(z.key, key);
                  if (cmp === 0) return;
                  else if (comp(z.key, key) < 0) z = z.right;
                  else z = z.left;
                }
              else
                while (z) {
                  p = z;
                  if (comp(z.key, key) < 0) z = z.right;
                  else z = z.left;
                }
              z = { key: key, data: data, left: null, right: null, parent: p };
              if (!p) this._root = z;
              else if (comp(p.key, z.key) < 0) p.right = z;
              else p.left = z;
              this.splay(z);
              this._size++;
              return z;
            }),
            (SplayTree.prototype.find = function find(key) {
              var z = this._root;
              var comp = this._compare;
              while (z) {
                var cmp = comp(z.key, key);
                if (cmp < 0) z = z.right;
                else if (cmp > 0) z = z.left;
                else return z;
              }
              return null;
            }),
            (SplayTree.prototype.contains = function contains(key) {
              var node = this._root;
              var comparator = this._compare;
              while (node) {
                var cmp = comparator(key, node.key);
                if (cmp === 0) return true;
                else if (cmp < 0) node = node.left;
                else node = node.right;
              }
              return false;
            }),
            (SplayTree.prototype.remove = function remove(key) {
              var z = this.find(key);
              if (!z) return false;
              this.splay(z);
              if (!z.left) this.replace(z, z.right);
              else if (!z.right) this.replace(z, z.left);
              else {
                var y = this.minNode(z.right);
                if (y.parent !== z) {
                  this.replace(y, y.right);
                  y.right = z.right;
                  y.right.parent = y;
                }
                this.replace(z, y);
                y.left = z.left;
                y.left.parent = y;
              }
              this._size--;
              return true;
            }),
            (SplayTree.prototype.removeNode = function removeNode(z) {
              if (!z) return false;
              this.splay(z);
              if (!z.left) this.replace(z, z.right);
              else if (!z.right) this.replace(z, z.left);
              else {
                var y = this.minNode(z.right);
                if (y.parent !== z) {
                  this.replace(y, y.right);
                  y.right = z.right;
                  y.right.parent = y;
                }
                this.replace(z, y);
                y.left = z.left;
                y.left.parent = y;
              }
              this._size--;
              return true;
            }),
            (SplayTree.prototype.erase = function erase(key) {
              var z = this.find(key);
              if (!z) return;
              this.splay(z);
              var s = z.left;
              var t = z.right;
              var sMax = null;
              if (s) {
                s.parent = null;
                sMax = this.maxNode(s);
                this.splay(sMax);
                this._root = sMax;
              }
              if (t) {
                if (s) sMax.right = t;
                else this._root = t;
                t.parent = sMax;
              }
              this._size--;
            }),
            (SplayTree.prototype.pop = function pop() {
              var node = this._root,
                returnValue = null;
              if (node) {
                while (node.left) node = node.left;
                returnValue = { key: node.key, data: node.data };
                this.remove(node.key);
              }
              return returnValue;
            }),
            (SplayTree.prototype.next = function next(node) {
              var successor = node;
              if (successor)
                if (successor.right) {
                  successor = successor.right;
                  while (successor && successor.left)
                    successor = successor.left;
                } else {
                  successor = node.parent;
                  while (successor && successor.right === node) {
                    node = successor;
                    successor = successor.parent;
                  }
                }
              return successor;
            }),
            (SplayTree.prototype.prev = function prev(node) {
              var predecessor = node;
              if (predecessor)
                if (predecessor.left) {
                  predecessor = predecessor.left;
                  while (predecessor && predecessor.right)
                    predecessor = predecessor.right;
                } else {
                  predecessor = node.parent;
                  while (predecessor && predecessor.left === node) {
                    node = predecessor;
                    predecessor = predecessor.parent;
                  }
                }
              return predecessor;
            }),
            (SplayTree.prototype.forEach = function forEach(callback) {
              var current = this._root;
              var s = [],
                done = false,
                i = 0;
              while (!done)
                if (current) {
                  s.push(current);
                  current = current.left;
                } else if (s.length > 0) {
                  current = s.pop();
                  callback(current, i++);
                  current = current.right;
                } else done = true;
              return this;
            }),
            (SplayTree.prototype.range = function range(low, high, fn, ctx) {
              var Q = [];
              var compare = this._compare;
              var node = this._root,
                cmp;
              while (Q.length !== 0 || node)
                if (node) {
                  Q.push(node);
                  node = node.left;
                } else {
                  node = Q.pop();
                  cmp = compare(node.key, high);
                  if (cmp > 0) break;
                  else if (compare(node.key, low) >= 0)
                    if (fn.call(ctx, node)) return this;
                  node = node.right;
                }
              return this;
            }),
            (SplayTree.prototype.keys = function keys() {
              var current = this._root;
              var s = [],
                r = [],
                done = false;
              while (!done)
                if (current) {
                  s.push(current);
                  current = current.left;
                } else if (s.length > 0) {
                  current = s.pop();
                  r.push(current.key);
                  current = current.right;
                } else done = true;
              return r;
            }),
            (SplayTree.prototype.values = function values() {
              var current = this._root;
              var s = [],
                r = [],
                done = false;
              while (!done)
                if (current) {
                  s.push(current);
                  current = current.left;
                } else if (s.length > 0) {
                  current = s.pop();
                  r.push(current.data);
                  current = current.right;
                } else done = true;
              return r;
            }),
            (SplayTree.prototype.at = function at(index) {
              var current = this._root;
              var s = [],
                done = false,
                i = 0;
              while (!done)
                if (current) {
                  s.push(current);
                  current = current.left;
                } else if (s.length > 0) {
                  current = s.pop();
                  if (i === index) return current;
                  i++;
                  current = current.right;
                } else done = true;
              return null;
            }),
            (SplayTree.prototype.load = function load(keys, values, presort) {
              if (keys === void 0) keys = [];
              if (values === void 0) values = [];
              if (presort === void 0) presort = false;
              if (this._size !== 0)
                throw new Error("bulk-load: tree is not empty");
              var size = keys.length;
              if (presort) sort(keys, values, 0, size - 1, this._compare);
              this._root = loadRecursive(null, keys, values, 0, size);
              this._size = size;
              return this;
            }),
            (SplayTree.prototype.min = function min() {
              var node = this.minNode(this._root);
              if (node) return node.key;
              else return null;
            }),
            (SplayTree.prototype.max = function max() {
              var node = this.maxNode(this._root);
              if (node) return node.key;
              else return null;
            }),
            (SplayTree.prototype.isEmpty = function isEmpty() {
              return this._root === null;
            }),
            (prototypeAccessors.size.get = function () {
              return this._size;
            }),
            (SplayTree.createTree = function createTree(
              keys,
              values,
              comparator,
              presort,
              noDuplicates
            ) {
              return new SplayTree(comparator, noDuplicates).load(
                keys,
                values,
                presort
              );
            }),
            Object.defineProperties(SplayTree.prototype, prototypeAccessors);
          var NORMAL = 0,
            NON_CONTRIBUTING = 1,
            SAME_TRANSITION = 2,
            DIFFERENT_TRANSITION = 3,
            INTERSECTION = 0,
            UNION = 1,
            DIFFERENCE = 2,
            XOR = 3;
          function computeFields(event, prev, operation) {
            if (prev === null) {
              event.inOut = false;
              event.otherInOut = true;
            } else {
              if (event.isSubject === prev.isSubject) {
                event.inOut = !prev.inOut;
                event.otherInOut = prev.otherInOut;
              } else {
                event.inOut = !prev.otherInOut;
                event.otherInOut = prev.isVertical() ? !prev.inOut : prev.inOut;
              }
              if (prev)
                event.prevInResult =
                  !inResult(prev, operation) || prev.isVertical()
                    ? prev.prevInResult
                    : prev;
            }
            var isInResult = inResult(event, operation);
            if (isInResult)
              event.resultTransition = determineResultTransition(
                event,
                operation
              );
            else event.resultTransition = 0;
          }
          function inResult(event, operation) {
            switch (event.type) {
              case NORMAL:
                switch (operation) {
                  case INTERSECTION:
                    return !event.otherInOut;
                  case UNION:
                    return event.otherInOut;
                  case DIFFERENCE:
                    return (
                      (event.isSubject && event.otherInOut) ||
                      (!event.isSubject && !event.otherInOut)
                    );
                  case XOR:
                    return true;
                }
                break;
              case SAME_TRANSITION:
                return operation === INTERSECTION || operation === UNION;
              case DIFFERENT_TRANSITION:
                return operation === DIFFERENCE;
              case NON_CONTRIBUTING:
                return false;
            }
            return false;
          }
          function determineResultTransition(event, operation) {
            var thisIn = !event.inOut;
            var thatIn = !event.otherInOut;
            var isIn;
            switch (operation) {
              case INTERSECTION:
                isIn = thisIn && thatIn;
                break;
              case UNION:
                isIn = thisIn || thatIn;
                break;
              case XOR:
                isIn = thisIn ^ thatIn;
                break;
              case DIFFERENCE:
                if (event.isSubject) isIn = thisIn && !thatIn;
                else isIn = thatIn && !thisIn;
                break;
            }
            return isIn ? +1 : -1;
          }
          var SweepEvent = function SweepEvent(
              point,
              left,
              otherEvent,
              isSubject,
              edgeType
            ) {
              this.left = left;
              this.point = point;
              this.otherEvent = otherEvent;
              this.isSubject = isSubject;
              this.type = edgeType || NORMAL;
              this.inOut = false;
              this.otherInOut = false;
              this.prevInResult = null;
              this.resultTransition = 0;
              this.otherPos = -1;
              this.outputContourId = -1;
              this.isExteriorRing = true;
            },
            prototypeAccessors$1 = { inResult: { configurable: true } };
          function equals(p1, p2) {
            if (p1[0] === p2[0])
              if (p1[1] === p2[1]) return true;
              else return false;
            return false;
          }
          (SweepEvent.prototype.isBelow = function isBelow(p) {
            var p0 = this.point,
              p1 = this.otherEvent.point;
            return this.left
              ? (p0[0] - p[0]) * (p1[1] - p[1]) -
                  (p1[0] - p[0]) * (p0[1] - p[1]) >
                  0
              : (p1[0] - p[0]) * (p0[1] - p[1]) -
                  (p0[0] - p[0]) * (p1[1] - p[1]) >
                  0;
          }),
            (SweepEvent.prototype.isAbove = function isAbove(p) {
              return !this.isBelow(p);
            }),
            (SweepEvent.prototype.isVertical = function isVertical() {
              return this.point[0] === this.otherEvent.point[0];
            }),
            (prototypeAccessors$1.inResult.get = function () {
              return this.resultTransition !== 0;
            }),
            (SweepEvent.prototype.clone = function clone() {
              var copy = new SweepEvent(
                this.point,
                this.left,
                this.otherEvent,
                this.isSubject,
                this.type
              );
              copy.contourId = this.contourId;
              copy.resultTransition = this.resultTransition;
              copy.prevInResult = this.prevInResult;
              copy.isExteriorRing = this.isExteriorRing;
              copy.inOut = this.inOut;
              copy.otherInOut = this.otherInOut;
              return copy;
            }),
            Object.defineProperties(SweepEvent.prototype, prototypeAccessors$1);
          var epsilon = 11102230246251565e-32,
            splitter = 134217729,
            resulterrbound = (3 + 8 * epsilon) * epsilon;
          function sum(elen, e, flen, f, h) {
            var Q, Qnew, hh, bvirt;
            var enow = e[0];
            var fnow = f[0];
            var eindex = 0;
            var findex = 0;
            if (fnow > enow === fnow > -enow) {
              Q = enow;
              enow = e[++eindex];
            } else {
              Q = fnow;
              fnow = f[++findex];
            }
            var hindex = 0;
            if (eindex < elen && findex < flen) {
              if (fnow > enow === fnow > -enow) {
                Qnew = enow + Q;
                hh = Q - (Qnew - enow);
                enow = e[++eindex];
              } else {
                Qnew = fnow + Q;
                hh = Q - (Qnew - fnow);
                fnow = f[++findex];
              }
              Q = Qnew;
              if (hh !== 0) h[hindex++] = hh;
              while (eindex < elen && findex < flen) {
                if (fnow > enow === fnow > -enow) {
                  Qnew = Q + enow;
                  bvirt = Qnew - Q;
                  hh = Q - (Qnew - bvirt) + (enow - bvirt);
                  enow = e[++eindex];
                } else {
                  Qnew = Q + fnow;
                  bvirt = Qnew - Q;
                  hh = Q - (Qnew - bvirt) + (fnow - bvirt);
                  fnow = f[++findex];
                }
                Q = Qnew;
                if (hh !== 0) h[hindex++] = hh;
              }
            }
            while (eindex < elen) {
              Qnew = Q + enow;
              bvirt = Qnew - Q;
              hh = Q - (Qnew - bvirt) + (enow - bvirt);
              enow = e[++eindex];
              Q = Qnew;
              if (hh !== 0) h[hindex++] = hh;
            }
            while (findex < flen) {
              Qnew = Q + fnow;
              bvirt = Qnew - Q;
              hh = Q - (Qnew - bvirt) + (fnow - bvirt);
              fnow = f[++findex];
              Q = Qnew;
              if (hh !== 0) h[hindex++] = hh;
            }
            if (Q !== 0 || hindex === 0) h[hindex++] = Q;
            return hindex;
          }
          function estimate(elen, e) {
            var Q = e[0];
            for (var i = 1; i < elen; i++) Q += e[i];
            return Q;
          }
          function vec(n) {
            return commonjsGlobal.Float64Array
              ? new Float64Array(n)
              : new Array(n);
          }
          var ccwerrboundA = (3 + 16 * epsilon) * epsilon,
            ccwerrboundB = (2 + 12 * epsilon) * epsilon,
            ccwerrboundC = (9 + 64 * epsilon) * epsilon * epsilon,
            B = vec(4),
            C1 = vec(8),
            C2 = vec(12),
            D = vec(16),
            u = vec(4);
          function orient2dadapt(ax, ay, bx, by, cx, cy, detsum) {
            var acxtail, acytail, bcxtail, bcytail;
            var bvirt, c, ahi, alo, bhi, blo, _i, _j, _0, s1, s0, t1, t0, u3;
            var acx = ax - cx;
            var bcx = bx - cx;
            var acy = ay - cy;
            var bcy = by - cy;
            s1 = acx * bcy;
            c = splitter * acx;
            ahi = c - (c - acx);
            alo = acx - ahi;
            c = splitter * bcy;
            bhi = c - (c - bcy);
            blo = bcy - bhi;
            s0 = alo * blo - (s1 - ahi * bhi - alo * bhi - ahi * blo);
            t1 = acy * bcx;
            c = splitter * acy;
            ahi = c - (c - acy);
            alo = acy - ahi;
            c = splitter * bcx;
            bhi = c - (c - bcx);
            blo = bcx - bhi;
            t0 = alo * blo - (t1 - ahi * bhi - alo * bhi - ahi * blo);
            _i = s0 - t0;
            bvirt = s0 - _i;
            B[0] = s0 - (_i + bvirt) + (bvirt - t0);
            _j = s1 + _i;
            bvirt = _j - s1;
            _0 = s1 - (_j - bvirt) + (_i - bvirt);
            _i = _0 - t1;
            bvirt = _0 - _i;
            B[1] = _0 - (_i + bvirt) + (bvirt - t1);
            u3 = _j + _i;
            bvirt = u3 - _j;
            B[2] = _j - (u3 - bvirt) + (_i - bvirt);
            B[3] = u3;
            var det = estimate(4, B);
            var errbound = ccwerrboundB * detsum;
            if (det >= errbound || -det >= errbound) return det;
            bvirt = ax - acx;
            acxtail = ax - (acx + bvirt) + (bvirt - cx);
            bvirt = bx - bcx;
            bcxtail = bx - (bcx + bvirt) + (bvirt - cx);
            bvirt = ay - acy;
            acytail = ay - (acy + bvirt) + (bvirt - cy);
            bvirt = by - bcy;
            bcytail = by - (bcy + bvirt) + (bvirt - cy);
            if (
              acxtail === 0 &&
              acytail === 0 &&
              bcxtail === 0 &&
              bcytail === 0
            )
              return det;
            errbound = ccwerrboundC * detsum + resulterrbound * Math.abs(det);
            det +=
              acx * bcytail + bcy * acxtail - (acy * bcxtail + bcx * acytail);
            if (det >= errbound || -det >= errbound) return det;
            s1 = acxtail * bcy;
            c = splitter * acxtail;
            ahi = c - (c - acxtail);
            alo = acxtail - ahi;
            c = splitter * bcy;
            bhi = c - (c - bcy);
            blo = bcy - bhi;
            s0 = alo * blo - (s1 - ahi * bhi - alo * bhi - ahi * blo);
            t1 = acytail * bcx;
            c = splitter * acytail;
            ahi = c - (c - acytail);
            alo = acytail - ahi;
            c = splitter * bcx;
            bhi = c - (c - bcx);
            blo = bcx - bhi;
            t0 = alo * blo - (t1 - ahi * bhi - alo * bhi - ahi * blo);
            _i = s0 - t0;
            bvirt = s0 - _i;
            u[0] = s0 - (_i + bvirt) + (bvirt - t0);
            _j = s1 + _i;
            bvirt = _j - s1;
            _0 = s1 - (_j - bvirt) + (_i - bvirt);
            _i = _0 - t1;
            bvirt = _0 - _i;
            u[1] = _0 - (_i + bvirt) + (bvirt - t1);
            u3 = _j + _i;
            bvirt = u3 - _j;
            u[2] = _j - (u3 - bvirt) + (_i - bvirt);
            u[3] = u3;
            var C1len = sum(4, B, 4, u, C1);
            s1 = acx * bcytail;
            c = splitter * acx;
            ahi = c - (c - acx);
            alo = acx - ahi;
            c = splitter * bcytail;
            bhi = c - (c - bcytail);
            blo = bcytail - bhi;
            s0 = alo * blo - (s1 - ahi * bhi - alo * bhi - ahi * blo);
            t1 = acy * bcxtail;
            c = splitter * acy;
            ahi = c - (c - acy);
            alo = acy - ahi;
            c = splitter * bcxtail;
            bhi = c - (c - bcxtail);
            blo = bcxtail - bhi;
            t0 = alo * blo - (t1 - ahi * bhi - alo * bhi - ahi * blo);
            _i = s0 - t0;
            bvirt = s0 - _i;
            u[0] = s0 - (_i + bvirt) + (bvirt - t0);
            _j = s1 + _i;
            bvirt = _j - s1;
            _0 = s1 - (_j - bvirt) + (_i - bvirt);
            _i = _0 - t1;
            bvirt = _0 - _i;
            u[1] = _0 - (_i + bvirt) + (bvirt - t1);
            u3 = _j + _i;
            bvirt = u3 - _j;
            u[2] = _j - (u3 - bvirt) + (_i - bvirt);
            u[3] = u3;
            var C2len = sum(C1len, C1, 4, u, C2);
            s1 = acxtail * bcytail;
            c = splitter * acxtail;
            ahi = c - (c - acxtail);
            alo = acxtail - ahi;
            c = splitter * bcytail;
            bhi = c - (c - bcytail);
            blo = bcytail - bhi;
            s0 = alo * blo - (s1 - ahi * bhi - alo * bhi - ahi * blo);
            t1 = acytail * bcxtail;
            c = splitter * acytail;
            ahi = c - (c - acytail);
            alo = acytail - ahi;
            c = splitter * bcxtail;
            bhi = c - (c - bcxtail);
            blo = bcxtail - bhi;
            t0 = alo * blo - (t1 - ahi * bhi - alo * bhi - ahi * blo);
            _i = s0 - t0;
            bvirt = s0 - _i;
            u[0] = s0 - (_i + bvirt) + (bvirt - t0);
            _j = s1 + _i;
            bvirt = _j - s1;
            _0 = s1 - (_j - bvirt) + (_i - bvirt);
            _i = _0 - t1;
            bvirt = _0 - _i;
            u[1] = _0 - (_i + bvirt) + (bvirt - t1);
            u3 = _j + _i;
            bvirt = u3 - _j;
            u[2] = _j - (u3 - bvirt) + (_i - bvirt);
            u[3] = u3;
            var Dlen = sum(C2len, C2, 4, u, D);
            return D[Dlen - 1];
          }
          function orient2d(ax, ay, bx, by, cx, cy) {
            var detleft = (ay - cy) * (bx - cx);
            var detright = (ax - cx) * (by - cy);
            var det = detleft - detright;
            if (detleft === 0 || detright === 0 || detleft > 0 !== detright > 0)
              return det;
            var detsum = Math.abs(detleft + detright);
            if (Math.abs(det) >= ccwerrboundA * detsum) return det;
            return -orient2dadapt(ax, ay, bx, by, cx, cy, detsum);
          }
          function signedArea(p0, p1, p2) {
            var res = orient2d(p0[0], p0[1], p1[0], p1[1], p2[0], p2[1]);
            if (res > 0) return -1;
            if (res < 0) return 1;
            return 0;
          }
          function compareEvents(e1, e2) {
            var p1 = e1.point;
            var p2 = e2.point;
            if (p1[0] > p2[0]) return 1;
            if (p1[0] < p2[0]) return -1;
            if (p1[1] !== p2[1]) return p1[1] > p2[1] ? 1 : -1;
            return specialCases(e1, e2, p1);
          }
          function specialCases(e1, e2, p1, p2) {
            if (e1.left !== e2.left) return e1.left ? 1 : -1;
            if (signedArea(p1, e1.otherEvent.point, e2.otherEvent.point) !== 0)
              return !e1.isBelow(e2.otherEvent.point) ? 1 : -1;
            return !e1.isSubject && e2.isSubject ? 1 : -1;
          }
          function divideSegment(se, p, queue) {
            var r = new SweepEvent(p, false, se, se.isSubject);
            var l = new SweepEvent(p, true, se.otherEvent, se.isSubject);
            if (equals(se.point, se.otherEvent.point))
              console.warn("what is that, a collapsed segment?", se);
            r.contourId = l.contourId = se.contourId;
            if (compareEvents(l, se.otherEvent) > 0) {
              se.otherEvent.left = true;
              l.left = false;
            }
            se.otherEvent.otherEvent = l;
            se.otherEvent = r;
            queue.push(l);
            queue.push(r);
            return queue;
          }
          function crossProduct(a, b) {
            return a[0] * b[1] - a[1] * b[0];
          }
          function dotProduct(a, b) {
            return a[0] * b[0] + a[1] * b[1];
          }
          function intersection(a1, a2, b1, b2, noEndpointTouch) {
            var va = [a2[0] - a1[0], a2[1] - a1[1]];
            var vb = [b2[0] - b1[0], b2[1] - b1[1]];
            function toPoint(p, s, d) {
              return [p[0] + s * d[0], p[1] + s * d[1]];
            }
            var e = [b1[0] - a1[0], b1[1] - a1[1]];
            var kross = crossProduct(va, vb);
            var sqrKross = kross * kross;
            var sqrLenA = dotProduct(va, va);
            if (sqrKross > 0) {
              var s = crossProduct(e, vb) / kross;
              if (s < 0 || s > 1) return null;
              var t = crossProduct(e, va) / kross;
              if (t < 0 || t > 1) return null;
              if (s === 0 || s === 1)
                return noEndpointTouch ? null : [toPoint(a1, s, va)];
              if (t === 0 || t === 1)
                return noEndpointTouch ? null : [toPoint(b1, t, vb)];
              return [toPoint(a1, s, va)];
            }
            kross = crossProduct(e, va);
            sqrKross = kross * kross;
            if (sqrKross > 0) return null;
            var sa = dotProduct(va, e) / sqrLenA;
            var sb = sa + dotProduct(va, vb) / sqrLenA;
            var smin = Math.min(sa, sb);
            var smax = Math.max(sa, sb);
            if (smin <= 1 && smax >= 0) {
              if (smin === 1)
                return noEndpointTouch
                  ? null
                  : [toPoint(a1, smin > 0 ? smin : 0, va)];
              if (smax === 0)
                return noEndpointTouch
                  ? null
                  : [toPoint(a1, smax < 1 ? smax : 1, va)];
              if (noEndpointTouch && smin === 0 && smax === 1) return null;
              return [
                toPoint(a1, smin > 0 ? smin : 0, va),
                toPoint(a1, smax < 1 ? smax : 1, va),
              ];
            }
            return null;
          }
          function possibleIntersection(se1, se2, queue) {
            var inter = intersection(
              se1.point,
              se1.otherEvent.point,
              se2.point,
              se2.otherEvent.point
            );
            var nintersections = inter ? inter.length : 0;
            if (nintersections === 0) return 0;
            if (
              nintersections === 1 &&
              (equals(se1.point, se2.point) ||
                equals(se1.otherEvent.point, se2.otherEvent.point))
            )
              return 0;
            if (nintersections === 2 && se1.isSubject === se2.isSubject)
              return 0;
            if (nintersections === 1) {
              if (
                !equals(se1.point, inter[0]) &&
                !equals(se1.otherEvent.point, inter[0])
              )
                divideSegment(se1, inter[0], queue);
              if (
                !equals(se2.point, inter[0]) &&
                !equals(se2.otherEvent.point, inter[0])
              )
                divideSegment(se2, inter[0], queue);
              return 1;
            }
            var events = [];
            var leftCoincide = false;
            var rightCoincide = false;
            if (equals(se1.point, se2.point)) leftCoincide = true;
            else if (compareEvents(se1, se2) === 1) events.push(se2, se1);
            else events.push(se1, se2);
            if (equals(se1.otherEvent.point, se2.otherEvent.point))
              rightCoincide = true;
            else if (compareEvents(se1.otherEvent, se2.otherEvent) === 1)
              events.push(se2.otherEvent, se1.otherEvent);
            else events.push(se1.otherEvent, se2.otherEvent);
            if ((leftCoincide && rightCoincide) || leftCoincide) {
              se2.type = NON_CONTRIBUTING;
              se1.type =
                se2.inOut === se1.inOut
                  ? SAME_TRANSITION
                  : DIFFERENT_TRANSITION;
              if (leftCoincide && !rightCoincide)
                divideSegment(events[1].otherEvent, events[0].point, queue);
              return 2;
            }
            if (rightCoincide) {
              divideSegment(events[0], events[1].point, queue);
              return 3;
            }
            if (events[0] !== events[3].otherEvent) {
              divideSegment(events[0], events[1].point, queue);
              divideSegment(events[1], events[2].point, queue);
              return 3;
            }
            divideSegment(events[0], events[1].point, queue);
            divideSegment(events[3].otherEvent, events[2].point, queue);
            return 3;
          }
          function compareSegments(le1, le2) {
            if (le1 === le2) return 0;
            if (
              signedArea(le1.point, le1.otherEvent.point, le2.point) !== 0 ||
              signedArea(
                le1.point,
                le1.otherEvent.point,
                le2.otherEvent.point
              ) !== 0
            ) {
              if (equals(le1.point, le2.point))
                return le1.isBelow(le2.otherEvent.point) ? -1 : 1;
              if (le1.point[0] === le2.point[0])
                return le1.point[1] < le2.point[1] ? -1 : 1;
              if (compareEvents(le1, le2) === 1)
                return le2.isAbove(le1.point) ? -1 : 1;
              return le1.isBelow(le2.point) ? -1 : 1;
            }
            if (le1.isSubject === le2.isSubject) {
              var p1 = le1.point,
                p2 = le2.point;
              if (p1[0] === p2[0] && p1[1] === p2[1]) {
                p1 = le1.otherEvent.point;
                p2 = le2.otherEvent.point;
                if (p1[0] === p2[0] && p1[1] === p2[1]) return 0;
                else return le1.contourId > le2.contourId ? 1 : -1;
              }
            } else return le1.isSubject ? -1 : 1;
            return compareEvents(le1, le2) === 1 ? 1 : -1;
          }
          function subdivide(
            eventQueue,
            subject,
            clipping,
            sbbox,
            cbbox,
            operation
          ) {
            var sweepLine = new SplayTree(compareSegments);
            var sortedEvents = [];
            var rightbound = Math.min(sbbox[2], cbbox[2]);
            var prev, next, begin;
            while (eventQueue.length !== 0) {
              var event = eventQueue.pop();
              sortedEvents.push(event);
              if (
                (operation === INTERSECTION && event.point[0] > rightbound) ||
                (operation === DIFFERENCE && event.point[0] > sbbox[2])
              )
                break;
              if (event.left) {
                next = prev = sweepLine.insert(event);
                begin = sweepLine.minNode();
                if (prev !== begin) prev = sweepLine.prev(prev);
                else prev = null;
                next = sweepLine.next(next);
                var prevEvent = prev ? prev.key : null;
                var prevprevEvent = void 0;
                computeFields(event, prevEvent, operation);
                if (next)
                  if (possibleIntersection(event, next.key, eventQueue) === 2) {
                    computeFields(event, prevEvent, operation);
                    computeFields(event, next.key, operation);
                  }
                if (prev)
                  if (possibleIntersection(prev.key, event, eventQueue) === 2) {
                    var prevprev = prev;
                    if (prevprev !== begin) prevprev = sweepLine.prev(prevprev);
                    else prevprev = null;
                    prevprevEvent = prevprev ? prevprev.key : null;
                    computeFields(prevEvent, prevprevEvent, operation);
                    computeFields(event, prevEvent, operation);
                  }
              } else {
                event = event.otherEvent;
                next = prev = sweepLine.find(event);
                if (prev && next) {
                  if (prev !== begin) prev = sweepLine.prev(prev);
                  else prev = null;
                  next = sweepLine.next(next);
                  sweepLine.remove(event);
                  if (next && prev)
                    possibleIntersection(prev.key, next.key, eventQueue);
                }
              }
            }
            return sortedEvents;
          }
          var Contour = function Contour() {
            this.points = [];
            this.holeIds = [];
            this.holeOf = null;
            this.depth = null;
          };
          function orderEvents(sortedEvents) {
            var event, i, len, tmp;
            var resultEvents = [];
            for (i = 0, len = sortedEvents.length; i < len; i++) {
              event = sortedEvents[i];
              if (
                (event.left && event.inResult) ||
                (!event.left && event.otherEvent.inResult)
              )
                resultEvents.push(event);
            }
            var sorted = false;
            while (!sorted) {
              sorted = true;
              for (i = 0, len = resultEvents.length; i < len; i++)
                if (
                  i + 1 < len &&
                  compareEvents(resultEvents[i], resultEvents[i + 1]) === 1
                ) {
                  tmp = resultEvents[i];
                  resultEvents[i] = resultEvents[i + 1];
                  resultEvents[i + 1] = tmp;
                  sorted = false;
                }
            }
            for (i = 0, len = resultEvents.length; i < len; i++) {
              event = resultEvents[i];
              event.otherPos = i;
            }
            for (i = 0, len = resultEvents.length; i < len; i++) {
              event = resultEvents[i];
              if (!event.left) {
                tmp = event.otherPos;
                event.otherPos = event.otherEvent.otherPos;
                event.otherEvent.otherPos = tmp;
              }
            }
            return resultEvents;
          }
          function nextPos(pos, resultEvents, processed, origPos) {
            var newPos = pos + 1,
              p = resultEvents[pos].point,
              p1;
            var length = resultEvents.length;
            if (newPos < length) p1 = resultEvents[newPos].point;
            while (newPos < length && p1[0] === p[0] && p1[1] === p[1]) {
              if (!processed[newPos]) return newPos;
              else newPos++;
              p1 = resultEvents[newPos].point;
            }
            newPos = pos - 1;
            while (processed[newPos] && newPos > origPos) newPos--;
            return newPos;
          }
          function initializeContourFromContext(event, contours, contourId) {
            var contour = new Contour();
            if (event.prevInResult != null) {
              var prevInResult = event.prevInResult;
              var lowerContourId = prevInResult.outputContourId;
              var lowerResultTransition = prevInResult.resultTransition;
              if (lowerResultTransition > 0) {
                var lowerContour = contours[lowerContourId];
                if (lowerContour.holeOf != null) {
                  var parentContourId = lowerContour.holeOf;
                  contours[parentContourId].holeIds.push(contourId);
                  contour.holeOf = parentContourId;
                  contour.depth = contours[lowerContourId].depth;
                } else {
                  contours[lowerContourId].holeIds.push(contourId);
                  contour.holeOf = lowerContourId;
                  contour.depth = contours[lowerContourId].depth + 1;
                }
              } else {
                contour.holeOf = null;
                contour.depth = contours[lowerContourId].depth;
              }
            } else {
              contour.holeOf = null;
              contour.depth = 0;
            }
            return contour;
          }
          function connectEdges(sortedEvents) {
            var i, len;
            var resultEvents = orderEvents(sortedEvents);
            var processed = {};
            var contours = [];
            var loop = function () {
              if (processed[i]) return;
              var contourId = contours.length;
              var contour = initializeContourFromContext(
                resultEvents[i],
                contours,
                contourId
              );
              var markAsProcessed = function (pos) {
                processed[pos] = true;
                resultEvents[pos].outputContourId = contourId;
              };
              var pos = i;
              var origPos = i;
              var initial = resultEvents[i].point;
              contour.points.push(initial);
              while (true) {
                markAsProcessed(pos);
                pos = resultEvents[pos].otherPos;
                markAsProcessed(pos);
                contour.points.push(resultEvents[pos].point);
                pos = nextPos(pos, resultEvents, processed, origPos);
                if (pos == origPos) break;
              }
              contours.push(contour);
            };
            for (i = 0, len = resultEvents.length; i < len; i++) loop();
            return contours;
          }
          Contour.prototype.isExterior = function isExterior() {
            return this.holeOf == null;
          };
          var tinyqueue = TinyQueue,
            default_1 = TinyQueue;
          function TinyQueue(data, compare) {
            if (!(this instanceof TinyQueue))
              return new TinyQueue(data, compare);
            this.data = data || [];
            this.length = this.data.length;
            this.compare = compare || defaultCompare;
            if (this.length > 0)
              for (var i = (this.length >> 1) - 1; i >= 0; i--) this._down(i);
          }
          function defaultCompare(a, b) {
            return a < b ? -1 : a > b ? 1 : 0;
          }
          (TinyQueue.prototype = {
            push: function (item) {
              this.data.push(item);
              this.length++;
              this._up(this.length - 1);
            },
            pop: function () {
              if (this.length === 0) return undefined;
              var top = this.data[0];
              this.length--;
              if (this.length > 0) {
                this.data[0] = this.data[this.length];
                this._down(0);
              }
              this.data.pop();
              return top;
            },
            peek: function () {
              return this.data[0];
            },
            _up: function (pos) {
              var data = this.data;
              var compare = this.compare;
              var item = data[pos];
              while (pos > 0) {
                var parent = (pos - 1) >> 1;
                var current = data[parent];
                if (compare(item, current) >= 0) break;
                data[pos] = current;
                pos = parent;
              }
              data[pos] = item;
            },
            _down: function (pos) {
              var data = this.data;
              var compare = this.compare;
              var halfLength = this.length >> 1;
              var item = data[pos];
              while (pos < halfLength) {
                var left = (pos << 1) + 1;
                var right = left + 1;
                var best = data[left];
                if (right < this.length && compare(data[right], best) < 0) {
                  left = right;
                  best = data[right];
                }
                if (compare(best, item) >= 0) break;
                data[pos] = best;
                pos = left;
              }
              data[pos] = item;
            },
          }),
            (tinyqueue.default = default_1);
          var max = Math.max,
            min = Math.min,
            contourId = 0;
          function processPolygon(
            contourOrHole,
            isSubject,
            depth,
            Q,
            bbox,
            isExteriorRing
          ) {
            var i, len, s1, s2, e1, e2;
            for (i = 0, len = contourOrHole.length - 1; i < len; i++) {
              s1 = contourOrHole[i];
              s2 = contourOrHole[i + 1];
              e1 = new SweepEvent(s1, false, undefined, isSubject);
              e2 = new SweepEvent(s2, false, e1, isSubject);
              e1.otherEvent = e2;
              if (s1[0] === s2[0] && s1[1] === s2[1]) continue;
              e1.contourId = e2.contourId = depth;
              if (!isExteriorRing) {
                e1.isExteriorRing = false;
                e2.isExteriorRing = false;
              }
              if (compareEvents(e1, e2) > 0) e2.left = true;
              else e1.left = true;
              var x = s1[0],
                y = s1[1];
              bbox[0] = min(bbox[0], x);
              bbox[1] = min(bbox[1], y);
              bbox[2] = max(bbox[2], x);
              bbox[3] = max(bbox[3], y);
              Q.push(e1);
              Q.push(e2);
            }
          }
          function fillQueue(subject, clipping, sbbox, cbbox, operation) {
            var eventQueue = new tinyqueue(null, compareEvents);
            var polygonSet, isExteriorRing, i, ii, j, jj;
            for (i = 0, ii = subject.length; i < ii; i++) {
              polygonSet = subject[i];
              for (j = 0, jj = polygonSet.length; j < jj; j++) {
                isExteriorRing = j === 0;
                if (isExteriorRing) contourId++;
                processPolygon(
                  polygonSet[j],
                  true,
                  contourId,
                  eventQueue,
                  sbbox,
                  isExteriorRing
                );
              }
            }
            for (i = 0, ii = clipping.length; i < ii; i++) {
              polygonSet = clipping[i];
              for (j = 0, jj = polygonSet.length; j < jj; j++) {
                isExteriorRing = j === 0;
                if (operation === DIFFERENCE) isExteriorRing = false;
                if (isExteriorRing) contourId++;
                processPolygon(
                  polygonSet[j],
                  false,
                  contourId,
                  eventQueue,
                  cbbox,
                  isExteriorRing
                );
              }
            }
            return eventQueue;
          }
          var EMPTY = [];
          function trivialOperation(subject, clipping, operation) {
            var result = null;
            if (subject.length * clipping.length === 0)
              if (operation === INTERSECTION) result = EMPTY;
              else if (operation === DIFFERENCE) result = subject;
              else if (operation === UNION || operation === XOR)
                result = subject.length === 0 ? clipping : subject;
            return result;
          }
          function compareBBoxes(subject, clipping, sbbox, cbbox, operation) {
            var result = null;
            if (
              sbbox[0] > cbbox[2] ||
              cbbox[0] > sbbox[2] ||
              sbbox[1] > cbbox[3] ||
              cbbox[1] > sbbox[3]
            )
              if (operation === INTERSECTION) result = EMPTY;
              else if (operation === DIFFERENCE) result = subject;
              else if (operation === UNION || operation === XOR)
                result = subject.concat(clipping);
            return result;
          }
          function boolean(subject, clipping, operation) {
            if (typeof subject[0][0][0] === "number") subject = [subject];
            if (typeof clipping[0][0][0] === "number") clipping = [clipping];
            var trivial = trivialOperation(subject, clipping, operation);
            if (trivial) return trivial === EMPTY ? null : trivial;
            var sbbox = [Infinity, Infinity, -Infinity, -Infinity];
            var cbbox = [Infinity, Infinity, -Infinity, -Infinity];
            var eventQueue = fillQueue(
              subject,
              clipping,
              sbbox,
              cbbox,
              operation
            );
            trivial = compareBBoxes(subject, clipping, sbbox, cbbox, operation);
            if (trivial) return trivial === EMPTY ? null : trivial;
            var sortedEvents = subdivide(
              eventQueue,
              subject,
              clipping,
              sbbox,
              cbbox,
              operation
            );
            var contours = connectEdges(sortedEvents);
            var polygons = [];
            for (var i = 0; i < contours.length; i++) {
              var contour = contours[i];
              if (contour.isExterior()) {
                var rings = [contour.points];
                for (var j = 0; j < contour.holeIds.length; j++) {
                  var holeId = contour.holeIds[j];
                  rings.push(contours[holeId].points);
                }
                polygons.push(rings);
              }
            }
            return polygons;
          }
          function union(subject, clipping) {
            return boolean(subject, clipping, UNION);
          }
          function diff(subject, clipping) {
            return boolean(subject, clipping, DIFFERENCE);
          }
          function xor(subject, clipping) {
            return boolean(subject, clipping, XOR);
          }
          function intersection$1(subject, clipping) {
            return boolean(subject, clipping, INTERSECTION);
          }
          var operations = {
            UNION: UNION,
            DIFFERENCE: DIFFERENCE,
            INTERSECTION: INTERSECTION,
            XOR: XOR,
          };
          (exports.diff = diff),
            (exports.intersection = intersection$1),
            (exports.operations = operations),
            (exports.union = union),
            (exports.xor = xor),
            Object.defineProperty(exports, "__esModule", { value: true });
        })(exports);
      })
    ),
    zoomRange = [2, 26],
    Const = {
      deg2rad: Math.PI / 180,
      rad2deg: 180 / Math.PI,
      earthRadius: 6378137,
    };
  function isClockwise(poly) {
    for (var sum = 0, len = poly.length, i = 0; i < len - 1; i++) {
      var next,
        cur = poly[i];
      sum += ((next = poly[i + 1])[0] - cur[0]) * (next[1] + cur[1]);
    }
    return (
      (poly[len - 1][0] === poly[0][0] && poly[len - 1][1] === poly[0][1]) ||
        ((cur = poly[len - 1]),
        (sum += ((next = poly[0])[0] - cur[0]) * (next[1] + cur[1]))),
      0 < sum
    );
  }
  (animationPlugin = (function () {
    function GeometryUtilCls(opts) {
      (this.CLASS_NAME = "AMap.GeometryUtil"),
        (this._opts = assign(
          { onSegmentTolerance: 5, crs: "EPSG3857", maxZoom: zoomRange[1] },
          opts
        )),
        this.setCrs(this._opts.crs);
    }
    return (
      (GeometryUtilCls.prototype.clone = function (opts) {
        return new GeometryUtilCls(assign({}, this._opts, opts));
      }),
      (GeometryUtilCls.prototype.isPoint = function (a) {
        return (
          a && (a instanceof LngLat$1 || (Util.isArray(a) && !isNaN(a[0])))
        );
      }),
      (GeometryUtilCls.prototype.normalizePoint = function (a) {
        return a;
      }),
      (GeometryUtilCls.prototype.normalizeLine = function (p) {
        for (var items = [], i = 0, len = p.length; i < len; i++)
          items.push(this.normalizePoint(p[i]));
        return items;
      }),
      (GeometryUtilCls.prototype.normalizeMultiLines = function (p) {
        for (
          var items = [],
            i = 0,
            len = (p = Util.isArray(p) && this.isPoint(p[0]) ? [p] : p).length;
          i < len;
          i++
        )
          items.push(this.normalizeLine(p[i]));
        return items;
      }),
      (GeometryUtilCls.prototype.setCrs = function (crs) {
        crs =
          crs && crs.project && crs.unproject
            ? crs
            : "plane" === crs
            ? {
                normalizePoint: function (a) {
                  return a && a.x && a.y ? [a.x, a.y] : a;
                },
                distance: function (a, dY) {
                  var dX = a[0] - dY[0],
                    dY = a[1] - dY[1];
                  return Math.sqrt(dX * dX + dY * dY);
                },
                project: function (a) {
                  return a;
                },
                unproject: function (a) {
                  return a;
                },
                ringArea: function (a) {
                  for (
                    var e0 = [0, 0],
                      e1 = [0, 0],
                      area = 0,
                      first = a[0],
                      l = a.length,
                      i = 2;
                    i < l;
                    i++
                  ) {
                    var p = a[i - 1],
                      c = a[i];
                    (e0[0] = first[0] - c[0]),
                      (e0[1] = first[1] - c[1]),
                      (e1[0] = first[0] - p[0]),
                      (e1[1] = first[1] - p[1]),
                      (area += e0[0] * e1[1] - e0[1] * e1[0]);
                  }
                  return area / 2;
                },
              }
            : (function (pro) {
                var crs = (function (pro) {
                  switch (pro) {
                    case "EPSG3857":
                      return ProjectionManager.getProjection("EPSG:3857");
                    case "EPSG4326":
                      return ProjectionManager.getProjection("EPSG:4326");
                  }
                  return ProjectionManager.getProjection("EPSG3857");
                })(pro);
                return {
                  project: function (a) {
                    return (
                      Util.isArray(a) && (a = new LngLat$1(a[0], a[1])),
                      crs.project(a.lng, a.lat)
                    );
                  },
                  unproject: function (a) {
                    return (
                      Util.isArray(a) && (a = new Pixel(a[0], a[1])),
                      crs.unproject(a.x, a.y)
                    );
                  },
                  normalizePoint: function (a) {
                    return Util.parseLngLatData(a);
                  },
                  distance: function (a, lon2) {
                    if (
                      ((lon2 = this.normalizePoint(lon2)), Util.isArray(lon2))
                    )
                      return this.distanceToLine(a, lon2);
                    a = this.normalizePoint(a);
                    var diam = Const.deg2rad,
                      cos = Math.cos,
                      lat1 = a.lat * diam,
                      dLon = a.lng * diam,
                      a = lon2.lat * diam,
                      lon2 = lon2.lng * diam,
                      diam = 2 * Const.earthRadius,
                      dLon = lon2 - dLon,
                      a =
                        (1 -
                          cos(a - lat1) +
                          (1 - cos(dLon)) * cos(lat1) * cos(a)) /
                        2;
                    return diam * Math.asin(Math.sqrt(a));
                  },
                  ringArea: function (yn) {
                    yn = this.normalizeLine(yn);
                    var metrePerDegree = Const.earthRadius * Const.deg2rad,
                      sum = 0,
                      arr = yn,
                      len = arr.length;
                    if (len < 3) return 0;
                    for (var i = 0; i < len - 1; i += 1) {
                      var x2 = arr[i],
                        n = arr[i + 1],
                        x1 =
                          x2.lng *
                          metrePerDegree *
                          Math.cos(x2.lat * Const.deg2rad),
                        y1 = x2.lat * metrePerDegree,
                        x2 =
                          n.lng *
                          metrePerDegree *
                          Math.cos(n.lat * Const.deg2rad);
                      sum += x1 * (n.lat * metrePerDegree) - x2 * y1;
                    }
                    var xf = arr[i],
                      p = arr[0],
                      xn =
                        xf.lng *
                        metrePerDegree *
                        Math.cos(xf.lat * Const.deg2rad),
                      yn = xf.lat * metrePerDegree,
                      xf =
                        p.lng *
                        metrePerDegree *
                        Math.cos(p.lat * Const.deg2rad);
                    return (
                      (sum += xn * (p.lat * metrePerDegree) - xf * yn),
                      0.5 * Math.abs(sum)
                    );
                  },
                  sphericalCalotteArea: function (h) {
                    var r = Const.earthRadius,
                      h = r - r * Math.cos(h / r);
                    return 2 * Math.PI * r * h;
                  },
                };
              })(crs, this._opts.maxZoom);
        assign(this, crs);
      }),
      (GeometryUtilCls.prototype.distance = function (p1, p2) {
        throw new Error("distance Not implemented!");
      }),
      (GeometryUtilCls.prototype._lineToRawCoords = function (
        line,
        makeClockwise
      ) {
        line = this.normalizeLine(line);
        for (
          var items = [],
            i = 0,
            len = (line = !this.isPoint(line[0]) ? line[0] : line).length;
          i < len;
          i++
        )
          items.push(this.project(line[i]));
        return (
          !0 === makeClockwise
            ? (items = this.makesureClockwise(items))
            : !1 === makeClockwise &&
              (items = this.makesureClockwise(items)).reverse(),
          items
        );
      }),
      (GeometryUtilCls.prototype._rawCoordsToLine = function (items) {
        for (var results = [], i = 0, len = items.length; i < len; i++)
          results.push(this.unproject(items[i]));
        return results;
      }),
      (GeometryUtilCls.prototype.closestOnSegment = function (a, p1, res) {
        res = Coordinate_closestOnSegment(
          this.project(a),
          this._lineToRawCoords([p1, res])
        );
        return this.unproject(res);
      }),
      (GeometryUtilCls.prototype.closestOnLine = function (a, line) {
        for (
          var p,
            minDist = 1 / 0,
            i = 0,
            len = (line = this.normalizeLine(line)).length;
          i < len - 1;
          i++
        ) {
          var closest = this.closestOnSegment(a, line[i], line[i + 1]),
            dist = this.distance(a, closest);
          dist < minDist && ((minDist = dist), (p = closest));
        }
        return p;
      }),
      (GeometryUtilCls.prototype.distanceToSegment = function (a, p1, p2) {
        return this.distanceToLine(a, [p1, p2]);
      }),
      (GeometryUtilCls.prototype.distanceToLine = function (a, line) {
        line = this.normalizeLine(line);
        for (
          var dist2 = 1 / 0,
            i = 0,
            len = (line = !this.isPoint(line[0]) ? line[0] : line).length;
          i < len - 1;
          i++
        )
          var closest = this.closestOnSegment(a, line[i], line[i + 1]),
            dist2 = Math.min(dist2, this.distance(a, closest));
        return dist2;
      }),
      (GeometryUtilCls.prototype.distanceToPolygon = function (a, polygon) {
        return this.isPointInRing(a, polygon)
          ? 0
          : this.distanceToLine(a, polygon);
      }),
      (GeometryUtilCls.prototype.isPointOnSegment = function (
        p,
        p1,
        p2,
        tolerance
      ) {
        return (
          ((!tolerance && 0 !== tolerance) || tolerance < 0) &&
            (tolerance = this._opts.onSegmentTolerance),
          this.distanceToSegment(p, p1, p2) <= tolerance
        );
      }),
      (GeometryUtilCls.prototype.isPointOnLine = function (a, line, tolerance) {
        for (
          var i = 0, len = (line = this.normalizeLine(line)).length;
          i < len - 1;
          i++
        )
          if (this.isPointOnSegment(a, line[i], line[i + 1], tolerance))
            return !0;
        return !1;
      }),
      (GeometryUtilCls.prototype.isPointOnRing = function (a, ring, tolerance) {
        for (
          var i = 0, len = (ring = this.normalizeLine(ring)).length;
          i < len;
          i++
        )
          if (
            this.isPointOnSegment(
              a,
              ring[i],
              ring[i === len - 1 ? 0 : i + 1],
              tolerance
            )
          )
            return !0;
        return !1;
      }),
      (GeometryUtilCls.prototype.isPointOnPolygon = function (
        a,
        rings,
        tolerance
      ) {
        for (
          var i = 0, len = (rings = this.normalizeMultiLines(rings)).length;
          i < len;
          i++
        )
          if (this.isPointOnRing(a, rings[i], tolerance)) return !0;
        return !1;
      }),
      (GeometryUtilCls.prototype.makesureClockwise = function (coords) {
        return (
          isClockwise(coords) || (coords = [].concat(coords)).reverse(), coords
        );
      }),
      (GeometryUtilCls.prototype.makesureAntiClockwise = function (coords) {
        return (
          isClockwise(coords) && (coords = [].concat(coords)).reverse(), coords
        );
      }),
      (GeometryUtilCls.prototype.pointInRing = function (
        pt,
        polys,
        ignoreBoundary
      ) {
        for (var insidePoly = !1, i = 0; i < polys.length && !insidePoly; i++)
          if (inRing(pt, polys[i][0], ignoreBoundary)) {
            for (var inHole = !1, k = 1; k < polys[i].length && !inHole; )
              inRing(pt, polys[i][k], !ignoreBoundary) && (inHole = !0), k++;
            inHole || (insidePoly = !0);
          }
        function inRing(pt, ring, ignoreBoundary) {
          for (
            var isInside = !1,
              i = 0,
              j =
                (ring =
                  ring[0][0] === ring[ring.length - 1][0] &&
                  ring[0][1] === ring[ring.length - 1][1]
                    ? ring.slice(0, ring.length - 1)
                    : ring).length - 1;
            i < ring.length;
            j = i++
          ) {
            var xi = ring[i][0],
              yi = ring[i][1],
              xj = ring[j][0],
              yj = ring[j][1];
            if (
              pt[1] * (xi - xj) + yi * (xj - pt[0]) + yj * (pt[0] - xi) == 0 &&
              (xi - pt[0]) * (xj - pt[0]) <= 0 &&
              (yi - pt[1]) * (yj - pt[1]) <= 0
            )
              return !ignoreBoundary;
            yi > pt[1] != yj > pt[1] &&
              pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi &&
              (isInside = !isInside);
          }
          return isInside;
        }
        return insidePoly;
      }),
      (GeometryUtilCls.prototype.isPointInBbox = function (pt, bbox) {
        for (
          var minX = 1 / 0, minY = 1 / 0, maxX = -1 / 0, maxY = -1 / 0, i = 0;
          i < bbox.length;
          i++
        )
          var b = bbox[i],
            minX = Math.min(minX, b[0]),
            maxX = Math.max(maxX, b[0]),
            minY = Math.min(minY, b[1]),
            maxY = Math.max(maxY, b[1]);
        return pt[0] > minX && pt[0] < maxX && pt[1] > minY && pt[1] < maxY;
      }),
      (GeometryUtilCls.prototype.isPointInRing = function (a, coords) {
        coords = this.normalizeLine(coords);
        coords = this._lineToRawCoords(coords, !0);
        return Coordinate_containsCoordinate(this.project(a), coords, !1);
      }),
      (GeometryUtilCls.prototype.isRingInRing = function (r1, r2) {
        for (var i = 0, len = r1.length; i < len; i++)
          if (!this.isPointInRing(r1[i], r2)) return !1;
        return !0;
      }),
      (GeometryUtilCls.prototype.isRingInRingByOutsea = function (r1, r2) {
        for (var i = 0, len = r1.length; i < len; i++)
          if (this.isPointInRing(r1[i], r2)) return !0;
        for (i = 0, len = r2.length; i < len; i++)
          if (this.isPointInRing(r2[i], r1)) return !0;
        return !1;
      }),
      (GeometryUtilCls.prototype.isRingInRingByMapbox = function (r1, r2) {
        for (var i = 0, len = r1.length; i < len; i++)
          if (!this.isPointInRing(r1[i], r2)) return !1;
        return !0;
      }),
      (GeometryUtilCls.prototype.isRingInRingByMapboxB = function (r1, r2) {
        for (var i = 0, len = r1.length; i < len; i++)
          if (this.isPointInRing(r1[i], r2)) return !0;
        return !1;
      }),
      (GeometryUtilCls.prototype.isPixelRingInRing = function (r1, r2) {
        for (var i = 0, len = r1.length; i < len; i++)
          if (Coordinate_containsCoordinate(r1[i], r2, !1)) return !0;
        return !1;
      }),
      (GeometryUtilCls.prototype.isPointInPolygon = function (a, rings) {
        for (
          var containsCoordinate,
            i = 0,
            len = (rings = this.normalizeMultiLines(rings)).length;
          i < len &&
          ((containsCoordinate = this.isPointInRing(a, rings[i])),
          (containsCoordinate =
            0 < i ? !containsCoordinate : containsCoordinate));
          i += 1
        );
        return Boolean(containsCoordinate);
      }),
      (GeometryUtilCls.prototype.isPointInPolygons = function (a, polys) {
        for (var c = 0; c < polys.length; c++) {
          for (
            var rings = polys[c],
              containsCoordinate = void 0,
              i = 0,
              len = (rings = this.normalizeMultiLines(rings)).length;
            i < len &&
            ((containsCoordinate = this.isPointInRing(a, rings[i])),
            (containsCoordinate =
              0 < i ? !containsCoordinate : containsCoordinate));
            i += 1
          );
          if (containsCoordinate) return !0;
        }
        return !1;
      }),
      (GeometryUtilCls.prototype.doesSegmentsIntersect = function (
        ua,
        a2,
        b1,
        b2
      ) {
        var ub = this._lineToRawCoords([ua, a2, b1, b2]);
        (ua = ub[0]), (a2 = ub[1]), (b1 = ub[2]);
        var result = !1,
          ua_t =
            ((b2 = ub[3])[0] - b1[0]) * (ua[1] - b1[1]) -
            (b2[1] - b1[1]) * (ua[0] - b1[0]),
          ub =
            (a2[0] - ua[0]) * (ua[1] - b1[1]) -
            (a2[1] - ua[1]) * (ua[0] - b1[0]),
          ua =
            (b2[1] - b1[1]) * (a2[0] - ua[0]) -
            (b2[0] - b1[0]) * (a2[1] - ua[1]);
        return (
          0 != ua &&
            ((ub = ub / ua),
            0 <= (ua = ua_t / ua) &&
              ua <= 1 &&
              0 <= ub &&
              ub <= 1 &&
              (result = !0)),
          result
        );
      }),
      (GeometryUtilCls.prototype.doesSegmentLineIntersect = function (
        p1,
        p2,
        line
      ) {
        for (
          var i = 0, len = (line = this.normalizeLine(line)).length;
          i < len - 1;
          i++
        )
          if (this.doesSegmentsIntersect(p1, p2, line[i], line[i + 1]))
            return !0;
        return !1;
      }),
      (GeometryUtilCls.prototype.doesSegmentRingIntersect = function (
        p1,
        p2,
        ring
      ) {
        for (
          var i = 0, len = (ring = this.normalizeLine(ring)).length;
          i < len;
          i++
        )
          if (
            this.doesSegmentsIntersect(
              p1,
              p2,
              ring[i],
              ring[i === len - 1 ? 0 : i + 1]
            )
          )
            return !0;
        return !1;
      }),
      (GeometryUtilCls.prototype.doesSegmentPolygonIntersect = function (
        p1,
        p2,
        rings
      ) {
        for (
          var i = 0, len = (rings = this.normalizeMultiLines(rings)).length;
          i < len;
          i++
        )
          if (this.doesSegmentRingIntersect(p1, p2, rings[i])) return !0;
        return !1;
      }),
      (GeometryUtilCls.prototype.doesLineLineIntersect = function (l1, l2) {
        for (
          var i = 0, len = (l1 = this.normalizeLine(l1)).length;
          i < len - 1;
          i++
        )
          if (this.doesSegmentLineIntersect(l1[i], l1[i + 1], l2)) return !0;
        return !1;
      }),
      (GeometryUtilCls.prototype.doesLineRingIntersect = function (l1, ring) {
        for (
          var i = 0, len = (l1 = this.normalizeLine(l1)).length;
          i < len - 1;
          i++
        )
          if (this.doesSegmentRingIntersect(l1[i], l1[i + 1], ring)) return !0;
        return !1;
      }),
      (GeometryUtilCls.prototype.doesPolygonPolygonIntersect = function (
        polygon1,
        polygon2
      ) {
        return !!(
          this.doesRingRingIntersect(polygon2, polygon1) ||
          this.isRingInRing(polygon1, polygon2) ||
          this.isRingInRing(polygon2, polygon1)
        );
      }),
      (GeometryUtilCls.prototype.doesRingRingIntersect = function (r1, r2) {
        for (
          var i = 0, len = (r1 = this.normalizeLine(r1)).length;
          i < len;
          i++
        )
          if (
            this.doesSegmentRingIntersect(
              r1[i],
              r1[i === len - 1 ? 0 : i + 1],
              r2
            )
          )
            return !0;
        return !1;
      }),
      (GeometryUtilCls.prototype.along = function (path, distance) {
        for (var dis = 0, i = 0; i < path.length - 1; i += 1) {
          var ppdis = this.distance(path[i], path[i + 1]);
          if (!(ppdis + dis < distance)) {
            var s = (distance - dis) / ppdis;
            return [
              path[i][0] + s * (path[i + 1][0] - path[i][0]),
              path[i][1] + s * (path[i + 1][1] - path[i][1]),
              i,
            ];
          }
          dis += ppdis;
        }
        return null;
      }),
      (GeometryUtilCls.prototype._clip = function (
        subjectPolygon,
        clipPolygon
      ) {
        for (
          var e,
            inside = function (p) {
              return (
                (cp2[0] - cp1[0]) * (p[1] - cp1[1]) >
                (cp2[1] - cp1[1]) * (p[0] - cp1[0])
              );
            },
            intersection = function () {
              var dc = [cp1[0] - cp2[0], cp1[1] - cp2[1]],
                dp = [s[0] - e[0], s[1] - e[1]],
                n1 = cp1[0] * cp2[1] - cp1[1] * cp2[0],
                n2 = s[0] * e[1] - s[1] * e[0],
                n3 = 1 / (dc[0] * dp[1] - dc[1] * dp[0]);
              return [
                (n1 * dp[0] - n2 * dc[0]) * n3,
                (n1 * dp[1] - n2 * dc[1]) * n3,
              ];
            },
            outputList = (subjectPolygon =
              this.makesureAntiClockwise(subjectPolygon)),
            cp1 = (clipPolygon = this.makesureClockwise(clipPolygon))[
              clipPolygon.length - 1
            ],
            j = 0,
            jlen = clipPolygon.length;
          j < jlen;
          j++
        ) {
          for (
            var cp2 = clipPolygon[j],
              inputList = outputList,
              outputList = [],
              s = inputList[inputList.length - 1],
              i = 0,
              len = inputList.length;
            i < len;
            i++
          )
            inside((e = inputList[i]))
              ? (inside(s) || outputList.push(intersection()),
                outputList.push(e))
              : inside(s) && outputList.push(intersection()),
              (s = e);
          cp1 = cp2;
        }
        return outputList;
      }),
      (GeometryUtilCls.prototype.ringRingClip = function (r1, clip) {
        (r1 = this._lineToRawCoords(r1)),
          (clip = this._lineToRawCoords(clip)),
          isEqual(r1[0], r1[r1.length - 1]) || r1.push(r1[0].slice()),
          isEqual(clip[0], clip[clip.length - 1]) || clip.push(clip[0].slice());
        clip = martinez.intersection([r1], [clip]);
        return clip && clip[0] && clip[0][0]
          ? this._rawCoordsToLine(clip[0][0])
          : [];
      }),
      (GeometryUtilCls.prototype.ringArea = function (r) {
        throw new Error("distance Not implemented!");
      }),
      (GeometryUtilCls.prototype.distanceOfLine = function (line) {
        for (
          var distance = 0,
            i = 0,
            len = (line = this.normalizeLine(line)).length;
          i < len - 1;
          i++
        )
          distance += this.distance(line[i], line[i + 1]);
        return distance;
      }),
      (GeometryUtilCls.prototype.isClockwise = function (line) {
        return isClockwise((line = this._lineToRawCoords(line)));
      }),
      (GeometryUtilCls.prototype.typePolygon = function (polygon) {
        return isArray(polygon) && isArray(polygon[0])
          ? 2 === polygon[0][0].length || polygon[0][0] instanceof LngLat$1
            ? "Polygon"
            : 2 < polygon[0][0].length &&
              (2 === polygon[0][0][0].length ||
                polygon[0][0][0] instanceof LngLat$1)
            ? "MultiPolygon"
            : "never"
          : "never";
      }),
      GeometryUtilCls
    );
  })()),
    (GeometryUtilInstance = new animationPlugin({})),
    (animationPlugin = new animationPlugin({}));
  animationPlugin.setCrs("plane");
  function extend(dest) {
    for (var args = [], _i = 1; _i < arguments.length; _i++)
      args[_i - 1] = arguments[_i];
    for (
      var src,
        target,
        sources = Array.prototype.slice.call(arguments, 1),
        j = 0,
        len = sources.length;
      j < len;
      j += 1
    )
      for (var key in (src = sources[j] || {}))
        src.hasOwnProperty(key) &&
          ("function" == typeof (target = src[key]) && dest.prototype
            ? (dest.prototype[key] = target)
            : (dest[key] = target));
    return dest;
  }
  var GeometryUtil = {
      distance: GeometryUtilInstance.distance.bind(GeometryUtilInstance),
      ringArea: GeometryUtilInstance.ringArea.bind(GeometryUtilInstance),
      isClockwise: GeometryUtilInstance.isClockwise.bind(GeometryUtilInstance),
      typePolygon: GeometryUtilInstance.typePolygon.bind(GeometryUtilInstance),
      makesureClockwise:
        GeometryUtilInstance.makesureClockwise.bind(GeometryUtilInstance),
      makesureAntiClockwise:
        GeometryUtilInstance.makesureAntiClockwise.bind(GeometryUtilInstance),
      distanceOfLine:
        GeometryUtilInstance.distanceOfLine.bind(GeometryUtilInstance),
      ringRingClip:
        GeometryUtilInstance.ringRingClip.bind(GeometryUtilInstance),
      doesSegmentsIntersect:
        GeometryUtilInstance.doesSegmentsIntersect.bind(GeometryUtilInstance),
      doesSegmentLineIntersect:
        GeometryUtilInstance.doesSegmentLineIntersect.bind(
          GeometryUtilInstance
        ),
      doesSegmentRingIntersect:
        GeometryUtilInstance.doesSegmentRingIntersect.bind(
          GeometryUtilInstance
        ),
      doesSegmentPolygonIntersect:
        GeometryUtilInstance.doesSegmentPolygonIntersect.bind(
          GeometryUtilInstance
        ),
      doesLineLineIntersect:
        GeometryUtilInstance.doesLineLineIntersect.bind(GeometryUtilInstance),
      doesLineRingIntersect:
        GeometryUtilInstance.doesLineRingIntersect.bind(GeometryUtilInstance),
      doesRingRingIntersect:
        GeometryUtilInstance.doesRingRingIntersect.bind(GeometryUtilInstance),
      pointInRing: GeometryUtilInstance.pointInRing.bind(GeometryUtilInstance),
      isPointInRing:
        GeometryUtilInstance.isPointInRing.bind(GeometryUtilInstance),
      isPointInBbox:
        GeometryUtilInstance.isPointInBbox.bind(GeometryUtilInstance),
      isRingInRing:
        GeometryUtilInstance.isRingInRing.bind(GeometryUtilInstance),
      isPointInPolygon:
        GeometryUtilInstance.isPointInPolygon.bind(GeometryUtilInstance),
      isPointInPolygons:
        GeometryUtilInstance.isPointInPolygons.bind(GeometryUtilInstance),
      isPointOnSegment:
        GeometryUtilInstance.isPointOnSegment.bind(GeometryUtilInstance),
      isPointOnLine:
        GeometryUtilInstance.isPointOnLine.bind(GeometryUtilInstance),
      isPointOnRing:
        GeometryUtilInstance.isPointOnRing.bind(GeometryUtilInstance),
      isPointOnPolygon:
        GeometryUtilInstance.isPointOnPolygon.bind(GeometryUtilInstance),
      closestOnSegment:
        GeometryUtilInstance.closestOnSegment.bind(GeometryUtilInstance),
      closestOnLine:
        GeometryUtilInstance.closestOnLine.bind(GeometryUtilInstance),
      distanceToSegment:
        GeometryUtilInstance.distanceToSegment.bind(GeometryUtilInstance),
      distanceToLine:
        GeometryUtilInstance.distanceToLine.bind(GeometryUtilInstance),
    },
    LngLat$1 =
      (animationPlugin.distance.bind(animationPlugin),
      animationPlugin.ringArea.bind(animationPlugin),
      animationPlugin.isClockwise.bind(animationPlugin),
      animationPlugin.typePolygon.bind(animationPlugin),
      animationPlugin.makesureClockwise.bind(animationPlugin),
      animationPlugin.makesureAntiClockwise.bind(animationPlugin),
      animationPlugin.distanceOfLine.bind(animationPlugin),
      animationPlugin.ringRingClip.bind(animationPlugin),
      animationPlugin.doesSegmentsIntersect.bind(animationPlugin),
      animationPlugin.doesSegmentLineIntersect.bind(animationPlugin),
      animationPlugin.doesSegmentRingIntersect.bind(animationPlugin),
      animationPlugin.doesSegmentPolygonIntersect.bind(animationPlugin),
      animationPlugin.doesLineLineIntersect.bind(animationPlugin),
      animationPlugin.doesLineRingIntersect.bind(animationPlugin),
      animationPlugin.doesRingRingIntersect.bind(animationPlugin),
      animationPlugin.pointInRing.bind(animationPlugin),
      animationPlugin.isPointInRing.bind(animationPlugin),
      animationPlugin.isPointInBbox.bind(animationPlugin),
      animationPlugin.isRingInRing.bind(animationPlugin),
      animationPlugin.isPointInPolygon.bind(animationPlugin),
      animationPlugin.isPointInPolygons.bind(animationPlugin),
      animationPlugin.isPointOnSegment.bind(animationPlugin),
      animationPlugin.isPointOnLine.bind(animationPlugin),
      animationPlugin.isPointOnRing.bind(animationPlugin),
      animationPlugin.isPointOnPolygon.bind(animationPlugin),
      animationPlugin.closestOnSegment.bind(animationPlugin),
      animationPlugin.closestOnLine.bind(animationPlugin),
      animationPlugin.distanceToSegment.bind(animationPlugin),
      animationPlugin.distanceToLine.bind(animationPlugin),
      (function () {
        function LngLat(lng, lat, noWrap) {
          var obj;
          if (
            (void 0 === noWrap && (noWrap = !1),
            (this.className = "AMap.LngLat"),
            (obj = lng),
            Array.isArray(obj) &&
            (function (tmp) {
              tmp = +tmp;
              return "number" == typeof +tmp && !isNaN(tmp);
            })(obj[0])
              ? ((lng = parseFloat(lng[0])), (lat = parseFloat(lng[1])))
              : ((lat = parseFloat(lat)), (lng = parseFloat(lng))),
            isNaN(lng) || isNaN(lat))
          )
            throw Error("Invalid Object: LngLat(" + lng + ", " + lat + ")");
          !0 !== noWrap &&
            ((lat = Math.max(Math.min(lat, 90), -90)),
            (lng =
              ((lng + 180) % 360) + (lng < -180 || 180 === lng ? 180 : -180))),
            (this._highLat = lat),
            (this._highLng = lng),
            (this.lng = Math.round(1e6 * lng) / 1e6),
            (this.lat = Math.round(1e6 * lat) / 1e6),
            (this.pos = ProjectionManager.getProjection("EPSG:3857").project(
              lng,
              lat
            ));
        }
        return (
          (LngLat.from = function (point) {
            return isLngLat(point)
              ? new LngLat(point._highLng, point._highLat)
              : new LngLat(point[0], point[1]);
          }),
          (LngLat.prototype.setLng = function (lng) {
            return (
              (this._highLng = lng),
              (this.lng = Math.round(1e6 * lng) / 1e6),
              this
            );
          }),
          (LngLat.prototype.setLat = function (lat) {
            return (
              (this._highLat = lat),
              (this.lat = Math.round(1e6 * lat) / 1e6),
              this
            );
          }),
          (LngLat.prototype.getLng = function () {
            return this.lng;
          }),
          (LngLat.prototype.getLat = function () {
            return this.lat;
          }),
          (LngLat.prototype.equals = function (another) {
            return (
              (another = (function parseLngLatData(data) {
                if (Array.isArray(data)) {
                  if (!Array.isArray(data[0])) {
                    var type = typeof data[0];
                    return "string" == type || "number" == type
                      ? new LngLat$1(data[0], data[1])
                      : data;
                  }
                  for (var i = 0; i < data.length; i += 1)
                    data[i] = parseLngLatData(data[i]);
                }
                return data;
              })(another)) instanceof LngLat &&
              Math.max(
                Math.abs(this._highLat - another._highLat),
                Math.abs(this._highLng - another._highLng)
              ) <= 1e-9
            );
          }),
          (LngLat.prototype.add = function (another, noWrap) {
            return new LngLat(
              this._highLng + another._highLng,
              this._highLat + another._highLat,
              noWrap
            );
          }),
          (LngLat.prototype.subtract = function (another, noWrap) {
            return new LngLat(
              this._highLng - another._highLng,
              this._highLat - another._highLat,
              noWrap
            );
          }),
          (LngLat.prototype.divideBy = function (num, noWrap) {
            return new LngLat(this._highLng / num, this._highLat / num, noWrap);
          }),
          (LngLat.prototype.multiplyBy = function (num, noWrap) {
            return new LngLat(this._highLng * num, this._highLat * num, noWrap);
          }),
          (LngLat.prototype.offset = function (lng, aLat) {
            if (isNaN(lng) || isNaN(aLat))
              throw Error("valid offset args, require number");
            (lng =
              2 *
              Math.asin(
                Math.sin(Math.round(lng) / 12756274) /
                  Math.cos((this._highLat * Math.PI) / 180)
              )),
              (lng = this._highLng + (180 * lng) / Math.PI),
              (aLat = 2 * Math.asin(Math.round(aLat) / 12756274));
            return new LngLat(lng, this._highLat + (180 * aLat) / Math.PI);
          }),
          (LngLat.prototype.toString = function () {
            return this.lng + "," + this.lat;
          }),
          (LngLat.prototype.toArray = function () {
            return [this.lng, this.lat];
          }),
          (LngLat.prototype.toJSON = function () {
            return [this.lng, this.lat];
          }),
          (LngLat.prototype.distanceTo = function (another) {
            return GeometryUtil.distance(this, another);
          }),
          (LngLat.prototype.distance = function (another) {
            return GeometryUtil.distance(this, another);
          }),
          LngLat
        );
      })()),
    Size = (function () {
      function Size(width, height, isRound) {
        if (
          (void 0 === isRound && (isRound = !1),
          (this.className = "AMap.Size"),
          isNaN(width) || isNaN(height))
        )
          throw new Error(
            "Invalid Object: Pixel(" + width + ", " + height + ")"
          );
        (this.width = isRound ? Math.round(width) : Number(width)),
          (this.height = isRound ? Math.round(height) : Number(height));
      }
      return (
        (Size.prototype.getWidth = function () {
          return this.width;
        }),
        (Size.prototype.getHeight = function () {
          return this.height;
        }),
        (Size.prototype.toString = function () {
          return this.width + "," + this.height;
        }),
        (Size.prototype.toArray = function () {
          return [this.width, this.height];
        }),
        Size
      );
    })();
  var Browser = (function (localStore) {
    var callback,
      webP,
      amapRunTime = { runSupport: new Date().getTime() },
      wasm = (function () {
        try {
          if (
            "object" == typeof WebAssembly &&
            "function" == typeof WebAssembly.instantiate &&
            TextDecoder &&
            TextEncoder
          ) {
            var module = new WebAssembly.Module(
              new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0])
            );
            if (module instanceof WebAssembly.Module)
              return (
                new WebAssembly.Instance(module) instanceof WebAssembly.Instance
              );
          }
        } catch (e) {}
        return !1;
      })(),
      ua = navigator.userAgent.toLowerCase(),
      hardwareAccEnabled = !0,
      mac = (any3d = function (key) {
        return -1 !== ua.indexOf(key);
      })("macintosh"),
      iPad = any3d("ipad;") || any3d("ipad "),
      viewportScale = any3d("ipod touch;"),
      iPhone = any3d("iphone;") || any3d("iphone "),
      ios = iPhone || iPad || viewportScale,
      safari = (mac || ios) && any3d("safari") && any3d("version/"),
      ie3d = any3d("macwechat"),
      isSvg = any3d("windowswechat"),
      Browser = {
        touch: !1,
        mac: mac,
        isRetina: !1,
        webkit: !1,
        isMobile: !1,
        scale: 1,
        android: !1,
        isWorkerEnv: (function () {
          try {
            document;
            return !1;
          } catch (e) {
            return !0;
          }
        })(),
        wasm: wasm,
        safari: safari,
        macWechat: ie3d,
        windowsWechat: isSvg,
        amapRunTime: amapRunTime,
      };
    if ("undefined" != typeof window && "undefined" != typeof document) {
      var win_1 = window,
        baseRender = document,
        vdataVersion = baseRender.documentElement,
        numberRegex_1 = /([a-z0-9]*\\d+[a-z0-9]*)/,
        blackGraphicCard_1 =
          "google swiftshader;microsoft basic render driver;vmware svga 3d;Intel 965GM;Intel B43;Intel G41;Intel G45;Intel G965;Intel GMA 3600;Intel Mobile 4;Intel Mobile 45;Intel Mobile 965".split(
            ";"
          ),
        ie = "ActiveXObject" in win_1,
        retina =
          0 != window.detectRetina &&
          (("devicePixelRatio" in win_1 && 1 < win_1.devicePixelRatio) ||
            (ie &&
              "matchMedia" in win_1 &&
              win_1.matchMedia("(min-resolution:144dpi)") &&
              win_1.matchMedia("(min-resolution:144dpi)").matches)),
        windows = any3d("windows nt"),
        movingDraw =
          (ua.search(/windows nt [1-5]\\./),
          ua.search(/windows nt 5\\.[12]/),
          any3d("windows nt 10"),
          any3d("windows phone")),
        mb2345Browser = any3d("Mb2345Browser"),
        ios10 =
          (ios && ua.search(/ os [456]_/),
          ios && ua.search(/ os [4-8]_/),
          ios && ua.search(/ os [78]_/),
          ios && any3d("os 8_"),
          ios && any3d("os 10_")),
        android_1 = any3d("android"),
        enableVector = 0;
      android_1 && (enableVector = parseInt(ua.split("android")[1]) || 0);
      var android23 = android_1 && enableVector < 4,
        plat_1 =
          ((android_1 && 5 <= enableVector) || ua.search(/android 4.4/),
          android_1
            ? "android"
            : ios
            ? "ios"
            : windows
            ? "windows"
            : mac
            ? "mac"
            : "other"),
        ie6 = ie && !win_1.XMLHttpRequest,
        ie7 = ie && !baseRender.querySelector,
        ielt9 = ie && !baseRender.addEventListener,
        ie9 = ie && any3d("msie 9"),
        ie10 = ie && any3d("msie 10"),
        ie11 = ie && any3d("rv:11"),
        ielt10 = ielt9 || ie9,
        edge = any3d("edge"),
        uc = (any3d("qtweb"), any3d("ucbrowser")),
        gaodeCoords = any3d("alipay") || (android_1 && uc),
        wechat = (any3d("miuibrowser"), any3d("micromessenger")),
        opera3d = any3d("dingtalk"),
        qq = any3d("mqqbrowser"),
        baidu = any3d("baidubrowser"),
        byWebgl = any3d("crios/"),
        chrome = any3d("chrome/"),
        webkit_1 =
          !((chrome || byWebgl) && any3d("chromium")) &&
          ((chrome && 30 < parseInt(ua.split("chrome/")[1])) ||
            (byWebgl && 30 < parseInt(ua.split("crios/")[1]))),
        firefox = any3d("firefox"),
        webkit3d = firefox && 27 < parseInt(ua.split("firefox/")[1]),
        gecko3d = safari && 7 < parseInt(ua.split("version/")[1]),
        mobile_1 =
          (ios && any3d("aliapp"),
          android_1 || ios || movingDraw || any3d("mobile")),
        checkWebgl = "ontouchstart" in baseRender,
        msPointer =
          win_1.navigator &&
          win_1.navigator.msPointerEnabled &&
          !!win_1.navigator.msMaxTouchPoints,
        pointer = win_1.navigator && !!win_1.navigator.maxTouchPoints,
        pointerDev = !checkWebgl && (pointer || msPointer),
        touch_1 = checkWebgl || pointerDev,
        viewportScale = (function () {
          if (!mobile_1) return win_1.devicePixelRatio || 1;
          var metas = document.getElementsByTagName("meta");
          if (window.parent && window.parent !== window)
            try {
              if (window.parent.location.origin !== window.location.origin)
                return 1;
              metas = window.parent.document.getElementsByTagName("meta");
            } catch (e) {
              return 1;
            }
          for (var i = metas.length - 1; 0 <= i; --i)
            if ("viewport" === metas[i].name) {
              var content = metas[i].content,
                initial_scale = void 0,
                minimum_scale = void 0,
                maximum_scale = void 0;
              return (
                -1 !== content.indexOf("initial-scale") &&
                  (initial_scale = parseFloat(
                    content.split("initial-scale=")[1]
                  )),
                (minimum_scale =
                  -1 !== content.indexOf("minimum-scale")
                    ? parseFloat(content.split("minimum-scale=")[1])
                    : 0),
                (maximum_scale =
                  -1 !== content.indexOf("maximum-scale")
                    ? parseFloat(content.split("maximum-scale=")[1])
                    : 1 / 0),
                initial_scale
                  ? minimum_scale <= maximum_scale
                    ? maximum_scale < initial_scale
                      ? maximum_scale
                      : initial_scale < minimum_scale
                      ? minimum_scale
                      : initial_scale
                    : (console &&
                        console.log &&
                        console.log("viewport参数不合法"),
                      null)
                  : minimum_scale <= maximum_scale
                  ? 1 <= minimum_scale
                    ? 1
                    : Math.min(maximum_scale, 1)
                  : (console &&
                      console.log &&
                      console.log("viewport参数不合法"),
                    null)
              );
            }
        })(),
        needFitRetina_1 =
          retina && (!mobile_1 || (!!viewportScale && 1 <= viewportScale)),
        ie3d = ie && "transition" in vdataVersion.style,
        isSvg =
          !!baseRender.createElementNS &&
          !!baseRender.createElementNS("http://www.w3.org/2000/svg", "svg")
            .createSVGRect,
        canvas_1 = baseRender.createElement("canvas"),
        isCanvas_1 = !(!canvas_1 || !canvas_1.getContext),
        enableVector = window.URL || window.webkitURL,
        isWorker_1 =
          !0 !== window.disableWorker &&
          !ie &&
          !(uc && android_1 && !webkit_1) &&
          window.Worker &&
          enableVector &&
          enableVector.createObjectURL &&
          window.Blob,
        webglContextName_1 = "",
        graphicCard_1 = "",
        maxRenderSize_1 = 0,
        byWebgl = 0 != window.higtQualityRender || !retina,
        movingDraw = window.movingDraw,
        webglParams_1 =
          (window.forceWebGL,
          { alpha: !0, antialias: byWebgl, depth: !0, stencil: !0 }),
        checkWebgl = function () {
          if (!isCanvas_1 || !isWorker_1) return !1;
          for (
            var contextName = ["webgl", "experimental-webgl", "moz-webgl"],
              gl = null,
              i = 0;
            i < contextName.length;
            i += 1
          ) {
            try {
              gl = canvas_1.getContext(contextName[i], webglParams_1);
            } catch (err) {}
            if (gl) {
              if (
                gl.drawingBufferWidth !== canvas_1.width ||
                gl.drawingBufferHeight !== canvas_1.height
              )
                return !1;
              if (
                !gl.getShaderPrecisionFormat ||
                !gl.getParameter ||
                !gl.getExtension
              )
                return !1;
              maxRenderSize_1 = gl.getParameter(gl.MAX_RENDERBUFFER_SIZE);
              var graphicCardShort = gl.getParameter(gl.MAX_VIEWPORT_DIMS);
              if (!graphicCardShort) return !1;
              (maxRenderSize_1 = Math.min(
                maxRenderSize_1,
                graphicCardShort[0],
                graphicCardShort[1]
              )),
                safari &&
                  "mac" == plat_1 &&
                  (maxRenderSize_1 = Math.min(maxRenderSize_1, 4096));
              graphicCardShort = Math.max(screen.width, screen.height);
              if (
                (needFitRetina_1 &&
                  (graphicCardShort *= Math.min(
                    2,
                    window.devicePixelRatio || 1
                  )),
                maxRenderSize_1 < graphicCardShort)
              )
                return !1;
              if (
                gl.getShaderPrecisionFormat(35632, 36338).precision < 23 ||
                gl.getShaderPrecisionFormat(35633, 36338).precision < 23
              )
                return !1;
              graphicCardShort = (function (graphicVersion) {
                if (!graphicVersion) return null;
                var forShort = null,
                  radeonIndex = (graphicVersion =
                    graphicVersion.toLowerCase()).match(/angle \\((.*)\\)/);
                if (
                  0 <=
                  (graphicVersion = (graphicVersion = radeonIndex
                    ? (graphicVersion = radeonIndex[1]).replace(
                        /\\s*direct3d.*$/,
                        ""
                      )
                    : graphicVersion).replace(
                    /\\s*\\([^\\)]*wddm[^\\)]*\\)/,
                    ""
                  )).indexOf("intel")
                ) {
                  forShort = ["Intel"];
                  return (
                    0 <= graphicVersion.indexOf("mobile") &&
                      forShort.push("Mobile"),
                    (0 <= graphicVersion.indexOf("gma") ||
                      0 <=
                        graphicVersion.indexOf("graphics media accelerator")) &&
                      forShort.push("GMA"),
                    0 <= graphicVersion.indexOf("haswell")
                      ? forShort.push("Haswell")
                      : 0 <= graphicVersion.indexOf("ivy")
                      ? forShort.push("HD 4000")
                      : 0 <= graphicVersion.indexOf("sandy")
                      ? forShort.push("HD 3000")
                      : 0 <= graphicVersion.indexOf("ironlake")
                      ? forShort.push("HD")
                      : (0 <= graphicVersion.indexOf("hd") &&
                          forShort.push("HD"),
                        (number = graphicVersion.match(numberRegex_1)) &&
                          forShort.push(number[1].toUpperCase())),
                    (forShort = forShort.join(" "))
                  );
                }
                if (
                  0 <= graphicVersion.indexOf("nvidia") ||
                  0 <= graphicVersion.indexOf("quadro") ||
                  0 <= graphicVersion.indexOf("geforce") ||
                  0 <= graphicVersion.indexOf("nvs")
                )
                  return (
                    (forShort = ["nVidia"]),
                    0 <= graphicVersion.indexOf("geforce") &&
                      forShort.push("geForce"),
                    0 <= graphicVersion.indexOf("quadro") &&
                      forShort.push("Quadro"),
                    0 <= graphicVersion.indexOf("nvs") && forShort.push("NVS"),
                    graphicVersion.match(/\\bion\\b/) && forShort.push("ION"),
                    graphicVersion.match(/gtx\\b/)
                      ? forShort.push("GTX")
                      : graphicVersion.match(/gts\\b/)
                      ? forShort.push("GTS")
                      : graphicVersion.match(/gt\\b/)
                      ? forShort.push("GT")
                      : graphicVersion.match(/gs\\b/)
                      ? forShort.push("GS")
                      : graphicVersion.match(/ge\\b/)
                      ? forShort.push("GE")
                      : graphicVersion.match(/fx\\b/) && forShort.push("FX"),
                    (number = graphicVersion.match(numberRegex_1)) &&
                      forShort.push(number[1].toUpperCase().replace("GS", "")),
                    0 <= graphicVersion.indexOf("titan")
                      ? forShort.push("TITAN")
                      : 0 <= graphicVersion.indexOf("ti") &&
                        forShort.push("Ti"),
                    (forShort = forShort.join(" "))
                  );
                if (
                  0 <= graphicVersion.indexOf("amd") ||
                  0 <= graphicVersion.indexOf("ati") ||
                  0 <= graphicVersion.indexOf("radeon") ||
                  0 <= graphicVersion.indexOf("firegl") ||
                  0 <= graphicVersion.indexOf("firepro")
                ) {
                  (forShort = ["AMD"]),
                    0 <= graphicVersion.indexOf("mobil") &&
                      forShort.push("Mobility");
                  var number,
                    radeonIndex = graphicVersion.indexOf("radeon");
                  return (
                    0 <= radeonIndex && forShort.push("Radeon"),
                    0 <= graphicVersion.indexOf("firepro")
                      ? forShort.push("FirePro")
                      : 0 <= graphicVersion.indexOf("firegl") &&
                        forShort.push("FireGL"),
                    0 <= graphicVersion.indexOf("hd") && forShort.push("HD"),
                    (number = (graphicVersion =
                      0 <= radeonIndex
                        ? graphicVersion.substring(radeonIndex)
                        : graphicVersion).match(numberRegex_1)) &&
                      forShort.push(number[1].toUpperCase().replace("HD", "")),
                    (forShort = forShort.join(" "))
                  );
                }
                return graphicVersion.substring(0, 100);
              })(
                (graphicCard_1 = gl.getExtension("WEBGL_debug_renderer_info")
                  ? gl.getParameter(37446)
                  : null)
              );
              if (graphicCardShort) {
                if (-1 < graphicCardShort.indexOf("google swiftshader"))
                  return (hardwareAccEnabled = !1);
                if (-1 !== blackGraphicCard_1.indexOf(graphicCardShort))
                  return !1;
              }
              return (webglContextName_1 = contextName[i]), !0;
            }
          }
          return !1;
        },
        baseRender = checkWebgl(),
        enableVector = void 0 === localStore[8] || localStore[8],
        byWebgl =
          window.Uint8Array &&
          enableVector &&
          !window.forbidenWebGL &&
          baseRender &&
          (window.forceWebGL ||
            ((webkit_1 || webkit3d || gecko3d || edge || wechat || opera3d) &&
              "other" != plat_1)),
        baseRender = window.forceWebGLBaseRender || byWebgl ? "w" : "d",
        webkit_1 = any3d("webkit"),
        webkit3d =
          "WebKitCSSMatrix" in win_1 && "m11" in new window.WebKitCSSMatrix(),
        gecko3d = "MozPerspective" in vdataVersion.style,
        opera3d = "OTransition" in vdataVersion.style,
        any3d = ie3d || webkit3d || gecko3d || opera3d,
        vdataVersion = void 0 !== localStore[12] ? localStore[12] : null,
        localStore = !0;
      try {
        void 0 === win_1.localStorage
          ? (localStore = !1)
          : ((chromeversion = new Date().getTime() + ""),
            win_1.localStorage.setItem("_test", chromeversion),
            win_1.localStorage.getItem("_test") !== chromeversion &&
              (localStore = !1),
            win_1.localStorage.removeItem("_test"));
      } catch (e) {
        localStore = !1;
      }
      var chromeversion = parseInt(ua.split("chrome/")[1]),
        Browser = {
          iPad: iPad,
          iPhone: iPhone,
          size: iPhone ? 100 : android_1 ? 200 : 500,
          mac: mac,
          windows: windows,
          ios: ios,
          ios10: ios10,
          android: android_1,
          android23: android23,
          gaodeCoords: gaodeCoords,
          plat: plat_1,
          baidu: baidu,
          qq: qq,
          safari: safari,
          wechat: wechat,
          ie: ie,
          ie6: ie6,
          ie7: ie7,
          ie9: ie9,
          ie10: ie10,
          ielt9: ielt9,
          ielt10: ielt10,
          ie11: ie11,
          edge: edge,
          ielt11: ie && !ie11,
          mb2345Browser: mb2345Browser,
          localStore: localStore,
          vdataVersion: vdataVersion,
          geolocation: mobile_1 || (ie && !ielt9) || edge,
          uc_: uc,
          uc: uc && !chrome,
          chrome: chrome,
          drawTextDir: !0,
          firefox: firefox,
          hardwareAccEnabled: hardwareAccEnabled,
          isMobile: mobile_1,
          mobileWebkit: mobile_1 && webkit_1,
          mobileWebkit3d: mobile_1 && webkit3d,
          mobileOpera: mobile_1 && win_1.opera,
          isRetina: retina,
          viewportScale: viewportScale,
          needFitRetina: needFitRetina_1,
          touch: touch_1,
          msPointer: msPointer,
          pointer: pointer,
          pointerDev: pointerDev,
          chrome57: chrome && 57 <= chromeversion,
          chrome64: !mobile_1 && chrome && 64 <= chromeversion,
          webkit: webkit_1,
          ie3d: ie3d,
          webkit3d: webkit3d,
          gecko3d: gecko3d,
          opera3d: opera3d,
          any3d: any3d,
          isSvg: isSvg,
          isCanvas: isCanvas_1,
          isWorker: isWorker_1,
          useLabelImage: !1,
          isWebGL: byWebgl,
          webglContextName: webglContextName_1,
          webglParams: webglParams_1,
          graphicCard: graphicCard_1,
          maxRenderSize: maxRenderSize_1,
          DataUrl2Blob: !1,
          movingDraw: movingDraw,
          baseRender: enableVector ? baseRender : "d",
          scale: retina ? 2 : 1,
          getContext: function (canvas, opt) {
            var params = {};
            return (
              extend(params, webglParams_1),
              extend(params, opt),
              canvas.getContext(webglContextName_1, params)
            );
          },
          isWebp: !1,
          wasm: wasm,
          amapRunTime: amapRunTime,
          checkWebgl: checkWebgl,
        };
      (callback = function (isWebp) {
        Browser.isWebp = isWebp;
      }),
        ((webP = new Image()).src =
          "data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMwAgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA"),
        (webP.onload = webP.onerror =
          function () {
            callback(2 === webP.height);
          });
    }
    return Browser;
  })("undefined" == typeof config ? [] : config);
  "undefined" != typeof createImageBitmap &&
    "undefined" != typeof ImageBitmap &&
    (Browser.imageBitmap = !0);
  var records,
    NEWTON_ITERATIONS,
    SUBDIVISION_PRECISION,
    SUBDIVISION_MAX_ITERATIONS,
    float32ArraySupported,
    animationPlugin = Boolean(
      Browser.isWorkerEnv
        ? !Browser.safari &&
            !Browser.macWechat &&
            !Browser.windowsWechat &&
            self.fetch &&
            self.Request &&
            self.AbortController &&
            self.Request.prototype.hasOwnProperty("signal")
        : !Browser.safari &&
            !Browser.macWechat &&
            !Browser.windowsWechat &&
            window.fetch &&
            window.Request &&
            window.AbortController &&
            window.Request.prototype.hasOwnProperty("signal")
    );
  function A(aA1, aA2) {
    return 1 - 3 * aA2 + 3 * aA1;
  }
  function B(aA1, aA2) {
    return 3 * aA2 - 6 * aA1;
  }
  function calcBezier(aT, aA1, aA2) {
    return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + 3 * aA1) * aT;
  }
  function getSlope(aT, aA1, aA2) {
    return 3 * A(aA1, aA2) * aT * aT + 2 * B(aA1, aA2) * aT + 3 * aA1;
  }
  function LinearEasing(x) {
    return x;
  }
  function getQuadBezierValue(t, p1, p2, p3) {
    if (1 <= t) return p3;
    var iT = 1 - t;
    return iT * iT * p1 + 2 * iT * t * p2 + t * t * p3;
  }
  function cubic(t, y, bY, p2, aY) {
    if (1 <= t) return aY;
    var x = 3 * (bY.pos[0] - y.pos[0]),
      bX = 3 * (p2.pos[0] - bY.pos[0]) - x,
      aX = aY.pos[0] - y.pos[0] - x - bX,
      cY = 3 * (bY.pos[1] - y.pos[1]),
      bY = 3 * (p2.pos[1] - bY.pos[1]) - cY,
      aY = aY.pos[1] - y.pos[1] - cY - bY,
      x = aX * Math.pow(t, 3) + bX * Math.pow(t, 2) + x * t + y.pos[0],
      y = aY * Math.pow(t, 3) + bY * Math.pow(t, 2) + cY * t + y.pos[1];
    return ProjectionManager.getProjection("EPSG:3857").unproject(x, y);
  }
  function quad(t, p0, p1, p2) {
    return ProjectionManager.getProjection("EPSG:3857").unproject(
      getQuadBezierValue(t, p0.pos[0], p1.pos[0], p2.pos[0]),
      getQuadBezierValue(t, p0.pos[1], p1.pos[1], p2.pos[1])
    );
  }
  function getCoordsWithControlPoints(coordsArr, next, cpList, scaleFactor) {
    var result = null;
    return (
      coordsArr &&
        cpList &&
        cpList.length &&
        ((coordsArr = [coordsArr]).push.apply(coordsArr, cpList),
        coordsArr.push(next),
        coordsArr.length,
        (result = (function (num, pList) {
          var func = null;
          switch (pList.length) {
            case 3:
              func = quad;
              break;
            case 4:
              func = cubic;
              break;
            default:
              return null;
          }
          for (
            var coords = [], params = [0].concat(pList), i = 1;
            i < num - 2;
            i++
          )
            (params[0] = i / num), coords.push(func.apply(null, params));
          return coords.push(pList[pList.length - 1]), coords;
        })(
          (function (pList, scaleFactor) {
            for (
              var tolerance = 4,
                interpolateLimit = [3, 300],
                tolerance = Math.max(2, tolerance),
                xLen = 0,
                yLen = 0,
                i = 0,
                len = pList.length;
              i < len - 1;
              i++
            ) {
              var p1 = pList[i],
                p2 = pList[i + 1];
              (xLen += Math.abs(p2.pos[0] - p1.pos[0])),
                (yLen += Math.abs(p2.pos[1] - p1.pos[1]));
            }
            return Math.min(
              interpolateLimit[1],
              Math.max(
                interpolateLimit[0],
                Math.round(Math.max(xLen, yLen) / scaleFactor / tolerance)
              )
            );
          })(coordsArr, scaleFactor),
          coordsArr
        ))),
      result || [next]
    );
  }
  (Browser.canceledWorkerFetch = animationPlugin),
    (Browser.amapRunTime = { workerTime: {} });
  var NebulaTagType,
    BezierUtil = {
      quad: quad,
      cubic: cubic,
      easing:
        ((records = {}),
        (NEWTON_ITERATIONS = 4),
        (SUBDIVISION_PRECISION = 1e-7),
        (SUBDIVISION_MAX_ITERATIONS = 10),
        (float32ArraySupported = "function" == typeof Float32Array),
        function (mX1, mY1, mX2, mY2) {
          if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1))
            throw new Error("bezier x values must be in [0, 1] range");
          var easingKey = arguments.toString();
          if (records[easingKey]) return records[easingKey];
          if (mX1 === mY1 && mX2 === mY2) return LinearEasing;
          for (
            var sampleValues = new (
                float32ArraySupported ? Float32Array : Array
              )(11),
              i = 0;
            i < 11;
            ++i
          )
            sampleValues[i] = calcBezier(0.1 * i, mX1, mX2);
          function getTForX(aX) {
            for (
              var intervalStart = 0, currentSample = 1;
              10 !== currentSample && sampleValues[currentSample] <= aX;
              ++currentSample
            )
              intervalStart += 0.1;
            var guessForT =
                intervalStart +
                0.1 *
                  ((aX - sampleValues[--currentSample]) /
                    (sampleValues[currentSample + 1] -
                      sampleValues[currentSample])),
              initialSlope = getSlope(guessForT, mX1, mX2);
            return 0.001 <= initialSlope
              ? (function (aX, aGuessT, mX1, mX2) {
                  for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
                    var currentSlope = getSlope(aGuessT, mX1, mX2);
                    if (0 === currentSlope) return aGuessT;
                    aGuessT -=
                      (calcBezier(aGuessT, mX1, mX2) - aX) / currentSlope;
                  }
                  return aGuessT;
                })(aX, guessForT, mX1, mX2)
              : 0 === initialSlope
              ? guessForT
              : (function (aX, aA, aB, mX1, mX2) {
                  for (
                    var currentX, currentT, i = 0;
                    0 <
                    (currentX =
                      calcBezier((currentT = aA + (aB - aA) / 2), mX1, mX2) -
                      aX)
                      ? (aB = currentT)
                      : (aA = currentT),
                      Math.abs(currentX) > SUBDIVISION_PRECISION &&
                        ++i < SUBDIVISION_MAX_ITERATIONS;

                  );
                  return currentT;
                })(aX, intervalStart, intervalStart + 0.1, mX1, mX2);
          }
          function easingFunction(x) {
            return 0 === x
              ? 0
              : 1 === x
              ? 1
              : calcBezier(getTForX(x), mY1, mY2);
          }
          return (records[easingKey] = easingFunction);
        }),
      getInterpolateCoords: function (lngLats, scaleFactor) {
        for (var coords = [], i = 0, len = lngLats.length; i < len; i += 1)
          coords.push.apply(
            coords,
            getCoordsWithControlPoints(
              lngLats[i - 1],
              lngLats[i],
              lngLats[i].controlPoints,
              scaleFactor
            )
          );
        return coords;
      },
      getInterpolateLngLats: function (lngLats, crs, scaleFactor, opts) {
        for (
          var coords = this.getInterpolateCoords(
              lngLats,
              crs,
              scaleFactor,
              opts
            ),
            results = [],
            i = 0,
            len = coords.length;
          i < len;
          i++
        )
          results.push(
            (function (crs, a) {
              return (
                Array.isArray(a) && (a = new Pixel(a[0], a[1])),
                crs.containerTolnglat(a, 20)
              );
            })(crs, coords[i])
          );
        return results;
      },
    },
    lcs = new ((function () {
      function LCS() {
        (this._wordCoord = [
          -20037508.342789244, -20037508.342789244, 20037508.342789244,
          20037508.342789244,
        ]),
          (this._widthNum = 128),
          (this._heightNum = 128),
          (this._widthSize =
            (this._wordCoord[2] - this._wordCoord[0]) / this._widthNum),
          (this._heightSize =
            (this._wordCoord[3] - this._wordCoord[1]) / this._heightNum);
      }
      return (
        (LCS.prototype.setMap = function (map) {
          this.map = map;
        }),
        (LCS.prototype.getSize = function () {
          return [this._widthSize, this._heightSize];
        }),
        (LCS.prototype.getNum = function () {
          return [this._widthNum, this._heightNum];
        }),
        (LCS.prototype.getLocalByLnglat = function (coord) {
          var _a,
            coord = (_a =
              ProjectionManager.getProjection("EPSG:3857")).project.apply(
              _a,
              coord
            );
          return this.getLocalByCoord(coord);
        }),
        (LCS.prototype.getLocalByCoord = function (coord) {
          var x = Math.floor(coord[0] / this._widthSize),
            y = Math.floor(coord[1] / this._heightSize),
            local = this.getLocalCenterByXY(x, y);
          return {
            deltaCenter: [
              coord[0] - local.center[0],
              coord[1] - local.center[1],
            ],
            x: x,
            y: y,
            center: local.center,
            bbox: local.bbox,
          };
        }),
        (LCS.prototype.getLocalCenterByXY = function (x, y) {
          var center = { x: x, y: y, center: [0, 0], bbox: [0, 0, 0, 0] };
          return (
            (center.center = [
              (x + 0.5) * this._widthSize,
              (y + 0.5) * this._heightSize,
            ]),
            (center.bbox = [
              x * this._widthSize,
              y * this._heightSize,
              (x + 1) * this._widthSize,
              (y + 1) * this._heightSize,
            ]),
            center
          );
        }),
        (LCS.prototype.getDeltaCoord = function (coord) {
          var centerObj = this.getLocalByCoord(coord);
          return [
            coord[0] - centerObj.center[0],
            coord[1] - centerObj.center[1],
          ];
        }),
        LCS
      );
    })())(),
    globalInstance = self;
  !(function (NebulaTagType) {
    (NebulaTagType.LITE = "lite"),
      (NebulaTagType.LEFT = "left"),
      (NebulaTagType.ALL = "all"),
      (NebulaTagType.NONE = "");
  })((NebulaTagType = NebulaTagType || {}));
  var TagMap = {
      2: "all",
      3: "all",
      4: "all",
      5: "all",
      6: "lite",
      7: "all",
      8: "lite",
      9: "all",
      10: "lite",
      11: "lite",
      12: "all",
      13: "all",
      14: "all",
      15: "lite",
      16: "lite",
      17: "all",
      18: "all",
      19: "all",
      20: "all",
    },
    colorNameDist = {
      aliceblue: "#f0f8ff",
      antiquewhite: "#faebd7",
      aqua: "#00ffff",
      aquamarine: "#7fffd4",
      azure: "#f0ffff",
      beige: "#f5f5dc",
      bisque: "#ffe4c4",
      black: "#000000",
      blanchedalmond: "#ffebcd",
      blue: "#0000ff",
      blueviolet: "#8a2be2",
      brown: "#a52a2a",
      burlywood: "#deb887",
      cadetblue: "#5f9ea0",
      chartreuse: "#7fff00",
      chocolate: "#d2691e",
      coral: "#ff7f50",
      cornflowerblue: "#6495ed",
      cornsilk: "#fff8dc",
      crimson: "#dc143c",
      cyan: "#00ffff",
      darkblue: "#00008b",
      darkcyan: "#008b8b",
      darkgoldenrod: "#b8860b",
      darkgray: "#a9a9a9",
      darkgreen: "#006400",
      darkkhaki: "#bdb76b",
      darkmagenta: "#8b008b",
      darkolivegreen: "#556b2f",
      darkorange: "#ff8c00",
      darkorchid: "#9932cc",
      darkred: "#8b0000",
      darksalmon: "#e9967a",
      darkseagreen: "#8fbc8f",
      darkslateblue: "#483d8b",
      darkslategray: "#2f4f4f",
      darkturquoise: "#00ced1",
      darkviolet: "#9400d3",
      deeppink: "#ff1493",
      deepskyblue: "#00bfff",
      dimgray: "#696969",
      dodgerblue: "#1e90ff",
      firebrick: "#b22222",
      floralwhite: "#fffaf0",
      forestgreen: "#228b22",
      fuchsia: "#ff00ff",
      gainsboro: "#dcdcdc",
      ghostwhite: "#f8f8ff",
      gold: "#ffd700",
      goldenrod: "#daa520",
      grey: "#808080",
      gray: "#808080",
      green: "#008000",
      greenyellow: "#adff2f",
      honeydew: "#f0fff0",
      hotpink: "#ff69b4",
      indianred: "#cd5c5c",
      indigo: "#4b0082",
      ivory: "#fffff0",
      khaki: "#f0e68c",
      lavender: "#e6e6fa",
      lavenderblush: "#fff0f5",
      lawngreen: "#7cfc00",
      lemonchiffon: "#fffacd",
      lightblue: "#add8e6",
      lightcoral: "#f08080",
      lightcyan: "#e0ffff",
      lightgoldenrodyellow: "#fafad2",
      lightgrey: "#d3d3d3",
      lightgreen: "#90ee90",
      lightpink: "#ffb6c1",
      lightsalmon: "#ffa07a",
      lightseagreen: "#20b2aa",
      lightskyblue: "#87cefa",
      lightslategray: "#778899",
      lightsteelblue: "#b0c4de",
      lightyellow: "#ffffe0",
      lime: "#00ff00",
      limegreen: "#32cd32",
      linen: "#faf0e6",
      magenta: "#ff00ff",
      maroon: "#800000",
      mediumaquamarine: "#66cdaa",
      mediumblue: "#0000cd",
      mediumorchid: "#ba55d3",
      mediumpurple: "#9370d8",
      mediumseagreen: "#3cb371",
      mediumslateblue: "#7b68ee",
      mediumspringgreen: "#00fa9a",
      mediumturquoise: "#48d1cc",
      mediumvioletred: "#c71585",
      midnightblue: "#191970",
      mintcream: "#f5fffa",
      mistyrose: "#ffe4e1",
      moccasin: "#ffe4b5",
      navajowhite: "#ffdead",
      navy: "#000080",
      oldlace: "#fdf5e6",
      olive: "#808000",
      olivedrab: "#6b8e23",
      orange: "#ffa500",
      orangered: "#ff4500",
      orchid: "#da70d6",
      palegoldenrod: "#eee8aa",
      palegreen: "#98fb98",
      paleturquoise: "#afeeee",
      palevioletred: "#d87093",
      papayawhip: "#ffefd5",
      peachpuff: "#ffdab9",
      peru: "#cd853f",
      pink: "#ffc0cb",
      plum: "#dda0dd",
      powderblue: "#b0e0e6",
      purple: "#800080",
      rebeccapurple: "#663399",
      red: "#ff0000",
      rosybrown: "#bc8f8f",
      royalblue: "#4169e1",
      saddlebrown: "#8b4513",
      salmon: "#fa8072",
      sandybrown: "#f4a460",
      seagreen: "#2e8b57",
      seashell: "#fff5ee",
      sienna: "#a0522d",
      silver: "#c0c0c0",
      skyblue: "#87ceeb",
      slateblue: "#6a5acd",
      slategray: "#708090",
      snow: "#fffafa",
      springgreen: "#00ff7f",
      steelblue: "#4682b4",
      tan: "#d2b48c",
      teal: "#008080",
      thistle: "#d8bfd8",
      tomato: "#ff6347",
      turquoise: "#40e0d0",
      violet: "#ee82ee",
      wheat: "#f5deb3",
      white: "#ffffff",
      whitesmoke: "#f5f5f5",
      yellow: "#ffff00",
      yellowgreen: "#9acd32",
    },
    Util = (function () {
      var supportNativeBind,
        CHARS,
        isWorker,
        lastId,
        originUtil = {
          CLASS_NAME: "AMap.Util",
          WorldAxesCenter: { x: 0, y: 0 },
          Single: {},
          stamp:
            ((isWorker = !0 === Browser.isWorkerEnv),
            (lastId = 1e5),
            function (obj) {
              return (
                (obj._amap_id = isWorker ? ++lastId : --lastId), obj._amap_id
              );
            }),
          singlton: function (singltonClass) {
            return Util.Single[singltonClass] || new singltonClass();
          },
          getOptimalZoom: function (z) {
            return z < Math.floor(z) + 0.8 ? Math.floor(z) : Math.ceil(z);
          },
          join: function (object, sp) {
            if (object.join) return object.join(sp);
            var i,
              r = [];
            for (i in object)
              object.hasOwnProperty(i) && r.push(i + "=" + (object[i] || ""));
            return r.join(sp);
          },
          getGuid: function (pre, median) {
            return (
              void 0 === median && (median = 10),
              (pre || "") +
                Math.round(Math.random() * Math.pow(10, median)) +
                "_" +
                new Date().getTime()
            );
          },
          uuid:
            ((CHARS =
              "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
                ""
              )),
            function (len, radix) {
              var i,
                chars = CHARS,
                uuid = [];
              if (
                ((radix =
                  (radix = void 0 === radix ? 62 : radix) || chars.length),
                (len = void 0 === len ? 0 : len))
              )
                for (i = 0; i < len; i++)
                  uuid[i] = chars[0 | (Math.random() * radix)];
              else {
                var r;
                for (
                  uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-",
                    uuid[14] = "4",
                    i = 0;
                  i < 36;
                  i++
                )
                  uuid[i] ||
                    ((r = 0 | (16 * Math.random())),
                    (uuid[i] = chars[19 === i ? (3 & r) | 8 : r]));
              }
              return uuid.join("");
            }),
          endsWith: function (longStr, shortStr) {
            return longStr.endsWith
              ? longStr.endsWith(shortStr)
              : !(longStr.length < shortStr.length) &&
                  longStr.substr(longStr.length - shortStr.length) === shortStr;
          },
          suspendedServices: [],
          globalPan: 268435456,
          p20Center: [215440491, 106744817],
          fps: {
            start: function (instance) {
              (instance.startTime = new Date()), (instance.times = []);
              function animate() {
                var now_ = new Date().getTime();
                instance.times.push(now_ - lastTime),
                  (lastTime = now_),
                  (instance.id = Util.requestAnimFrame(animate));
              }
              var lastTime = new Date().getTime();
              instance.id = Util.requestAnimFrame(animate);
            },
            cancel: function (instance) {
              instance.id && Util.cancelAnimFrame(instance.id);
            },
            stop: function (instance) {
              (instance.costTime = Date.now() - instance.startTime),
                this.cancel(instance),
                (instance.fps = Math.round(
                  1e3 / (instance.costTime / (instance.times.length + 1))
                ));
            },
          },
          getTransitionalVal: function (
            deltaValue,
            nextValue,
            percent,
            easeFunction,
            isRound
          ) {
            if (
              (void 0 === isRound && (isRound = !1), deltaValue === nextValue)
            )
              return nextValue;
            switch (
              (easeFunction = void 0 === easeFunction ? "linear" : easeFunction)
            ) {
              case "ease":
                percent = BezierUtil.easing(0.25, 0.1, 0.25, 1)(percent);
                break;
              case "ease-in":
                percent = BezierUtil.easing(0.42, 0, 1, 1)(percent);
                break;
              case "ease-out":
                percent = BezierUtil.easing(0, 0, 0.58, 1)(percent);
                break;
              case "ease-in-out":
                percent = BezierUtil.easing(0.42, 0, 0.58, 1)(percent);
            }
            deltaValue += (nextValue - deltaValue) * percent;
            return isRound && (deltaValue >>= 0), deltaValue;
          },
          createObjectURL: function (code, contentType) {
            void 0 === contentType &&
              (contentType = "text/javascript; charset=utf-8");
            var url = null;
            try {
              url = (
                globalInstance.URL || globalInstance.webkitURL
              ).createObjectURL(new Blob([code], { type: contentType }));
            } catch (e) {
              url = null;
            }
            return url;
          },
          revokeObjectURL: function (url) {
            try {
              (globalInstance.URL || globalInstance.webkitURL).revokeObjectURL(
                url
              );
            } catch (e) {}
          },
          arrayToVIObj: function (array) {
            for (var obj = {}, i = 0, l = array.length; i < l; i++)
              obj[array[i]] = i;
            return obj;
          },
          lnglatToCoords: function (lnglat, dlat) {
            var tileNum = Math.pow(2, dlat),
              dlat = 180 / tileNum;
            return [
              Math.floor(lnglat[0] / (360 / tileNum)) + tileNum / 2,
              tileNum / 2 - Math.ceil(lnglat[1] / dlat),
            ];
          },
          computeTileRange: function (minCoords, z, isPure) {
            void 0 === isPure && (isPure = !1);
            var maxCoords = [minCoords[0], minCoords[3]],
              minX = [minCoords[2], minCoords[1]],
              minCoords = this.lnglatToCoords(maxCoords, z),
              maxCoords = this.lnglatToCoords(minX, z),
              minX = minCoords[0],
              minY = minCoords[1],
              maxX = maxCoords[0],
              maxY = maxCoords[1];
            if (isPure)
              return { minX: minX, minY: minY, maxX: maxX, maxY: maxY, z: z };
            this._optimalTileRange = {
              minX: minX,
              minY: minY,
              maxX: maxX,
              maxY: maxY,
              z: z,
            };
            for (var tileRange = [], i = minX; i <= maxX; i += 1)
              for (var j = minY; j <= maxY; j += 1) tileRange.push([z, i, j]);
            return tileRange;
          },
          getMappingKey: function (conf) {
            var obj = {};
            if (Util.is(conf, "object"))
              for (var key in conf)
                conf.hasOwnProperty(key) && (obj[conf[key]] = key);
            return obj;
          },
          merge: function (array1, array2) {
            if (array2.length < 5e4) array1.push.apply(array1, array2);
            else
              for (var ii = 0, iilen = array2.length; ii < iilen; ii += 1)
                array1.push(array2[ii]);
          },
          clone: function (a) {
            if ("object" != typeof a || null === a) return a;
            if (
              a.noDeepClone ||
              this.is(a, "Float32Array") ||
              this.is(a, "Uint16Array")
            )
              return a;
            var i,
              b = this.isArray(a) ? [] : {};
            for (i in a) a.hasOwnProperty(i) && (b[i] = Util.clone(a[i]));
            return b;
          },
          isInteger: function (num) {
            return (0 | num) === num;
          },
          isNumber: function (num) {
            return !isNaN(num);
          },
          setPrototypeOf:
            "function" == typeof Object.setPrototypeOf
              ? Object.setPrototypeOf
              : function (obj, _prototype) {
                  for (var key in _prototype) obj[key] = _prototype[key];
                },
          isFunction: function (value) {
            return "function" == typeof value;
          },
          argbToArray: function (argb, format) {
            if ((void 0 === format && (format = "webgl"), !argb)) return argb;
            for (var array = [], i = 0, l = argb.length; i < l; i += 2) {
              var val = parseInt(argb.substr(i, 2), 16);
              ("webgl" === format || ("rgba" === format && 0 === i)) &&
                (val = this.format(val / 255, 3)),
                array.push(val);
            }
            return array.push(array.shift()), array;
          },
          noop: function () {},
          keys:
            "function" == typeof Object.keys
              ? Object.keys
              : function (obj) {
                  var key,
                    keys = [];
                  for (key in obj) obj.hasOwnProperty(key) && keys.push(key);
                  return keys;
                },
          map: function (collection, fun, context) {
            void 0 === context && (context = null);
            var newCollection = [];
            return collection && collection.length
              ? (Util.each(collection, function () {
                  for (var args = [], _a = 0; _a < arguments.length; _a++)
                    args[_a] = arguments[_a];
                  var index = args[1];
                  newCollection[index] = fun.apply(context || collection, args);
                }),
                newCollection)
              : collection;
          },
          forEach: function (collection, fun) {
            if (collection && collection.length) {
              var l = collection.length;
              if (0 < l && (fun(collection[0], 0), 1 < l)) {
                fun(collection[1], 1);
                for (var i = 2; i < l; i++) fun(collection[i], i);
              }
            }
          },
          each: function (collection, fun, context) {
            if (
              (void 0 === context && (context = null),
              collection && collection.length)
            )
              for (
                var i = 0, l = collection.length;
                i < l && !1 !== fun.call(context, collection[i], i, collection);
                i++
              );
          },
          find: function (collection, fn, context) {
            void 0 === context && (context = null);
            for (var i = 0, l = collection.length; i < l; i++)
              if ("function" == typeof fn) {
                if (fn.call(context, collection[i], i, collection))
                  return collection[i];
              } else if (collection[i] === fn) return collection[i];
            return null;
          },
          isDOM: function (obj) {
            return "object" == typeof HTMLElement
              ? obj instanceof HTMLElement
              : obj &&
                  "object" == typeof obj &&
                  1 === obj.nodeType &&
                  "string" == typeof obj.nodeName;
          },
          uncodeCoords: function (ori, version) {
            for (
              var charactersLength,
                d,
                characters =
                  "ASDFGHJKLQWERTYUIO!sdfghjkleiu3~yr5-P&mq9`%zCN*b=8@^xpVM",
                offset =
                  "v5" < (version = version || "v5")
                    ? ((charactersLength = characters.length), 512)
                    : ((characters = characters.substr(
                        0,
                        (charactersLength = 27)
                      )),
                      333),
                res = [],
                temp = NaN,
                _i = 0,
                _len = ori.length;
              _i < _len;
              _i++
            )
              (d = ori[_i]),
                (d = characters.indexOf(d)),
                (temp = isNaN(temp)
                  ? d * charactersLength
                  : (res.push(temp + d - offset), NaN));
            return res;
          },
          separateDoForLoop: function (func, array) {
            for (
              var unit = 1,
                unit =
                  512 < array.length
                    ? Math.round(Math.pow(array.length, 0.5))
                    : array.length,
                groups = Math.ceil(array.length / unit),
                i = 0;
              i < groups;
              i += 1
            ) {
              var s = unit * i,
                e = s + unit;
              e > array.length && (e = array.length);
              for (var j = s; j < e; j += 1) func(array[j]);
            }
          },
          colorToArray: function (rgbaColor) {
            if (/^rgba\\(/.test(rgbaColor))
              return this.rgbaStrToArray(rgbaColor);
            var hex = this.colorNameToHex(rgbaColor),
              rgbaColor = hex;
            return (
              "#" === hex[0] &&
                (3 === (hex = hex.substring(1)).length &&
                  (hex = hex.replace(/./g, function (str) {
                    return str + str;
                  })),
                (rgbaColor = this.argbHex2Rgba(
                  8 === hex.length ? hex : "ff" + hex
                ))),
              this.rgbaStrToArray(rgbaColor)
            );
          },
          colorNameToHex: function (colorName) {
            return (
              ("string" ==
                typeof (colorName = (colorName =
                  void 0 === colorName ? "" : colorName).toLowerCase()) &&
                colorNameDist[colorName]) ||
              colorName
            );
          },
          enCodeTileCoord: function (x, y, z) {
            var m1 = Math.floor(z / 2),
              m2 = z - m1,
              m1 = ((1 << m1) - 1) << m2,
              m2 = (1 << m2) - 1;
            return [z, (x & m1) | (y & m2), (y & m1) | (x & m2)];
          },
          encodeURICom: function (keyword) {
            return keyword ? encodeURIComponent(keyword) : "";
          },
          getStyle: function (styleList, index, styleid, level) {
            var styleMap = styleList[index].i[styleid];
            if (void 0 === styleMap) return null;
            if (((styleList = styleList[index].s), "number" == typeof styleMap))
              return styleList[styleMap];
            for (; void 0 === styleMap[level.toString()] && !(--level < 3); );
            return "number" == typeof (index = styleMap[level.toString()])
              ? styleList[index]
              : null;
          },
          rgbaStrToArray: function (splits) {
            splits = splits.split(",");
            return (
              (splits[0] = parseFloat(splits[0].split("rgba(")[1]) / 255),
              (splits[1] = parseFloat(splits[1]) / 255),
              (splits[2] = parseFloat(splits[2]) / 255),
              (splits[3] = parseFloat(splits[3])),
              splits
            );
          },
          rgbStrToArray: function (splits) {
            splits = splits.split(",");
            return (
              (splits[0] = parseFloat(splits[0].split("rgb(")[1]) / 255),
              (splits[1] = parseFloat(splits[1]) / 255),
              (splits[2] = parseFloat(splits[2]) / 255),
              splits
            );
          },
          rgbaArray2rgba: function (array) {
            return (
              "rgba(" +
              255 * array[0] +
              "," +
              255 * array[1] +
              "," +
              255 * array[2] +
              "," +
              array[3] +
              ")"
            );
          },
          color2Rgba: function (color) {
            return this.rgbaArray2rgba(this.color2RgbaArray(color));
          },
          color2RgbaArray: function (color) {
            if (color instanceof Array)
              return 3 == color.length && color.push(1), color;
            var rgba = this.colorNameToHex(color);
            if (0 == rgba.indexOf("rgb(")) {
              var a = this.rgbStrToArray(rgba);
              return a.push(1), a;
            }
            if (0 == rgba.indexOf("rgba(")) return this.rgbaStrToArray(rgba);
            if (0 != rgba.indexOf("#")) {
              if (0 === rgba.indexOf("hsla")) {
                var oc = color.substr(5).split(","),
                  h = parseInt(oc[0], 10) / 360,
                  s = parseInt(oc[1], 10) / 100,
                  hex = parseInt(oc[2], 10) / 100,
                  a = parseFloat(oc[3]);
                return this.HSLA2RGBA(h, s, hex, a);
              }
              if (0 === rgba.indexOf("hsl")) {
                (oc = color.substr(4).split(",")),
                  (h = parseInt(oc[0], 10) / 360),
                  (s = parseInt(oc[1], 10) / 100),
                  (hex = parseInt(oc[2], 10) / 100);
                return this.HSLA2RGBA(h, s, hex, 1);
              }
              if (3 !== rgba.length)
                return 6 == rgba.length
                  ? this.rgbHex2RgbaArray(rgba)
                  : 8 == rgba.length
                  ? this.argbHex2RgbaArray(rgba)
                  : void 0;
              hex = rgba.replace(/./g, function (str) {
                return str + str;
              });
              return this.rgbHex2RgbaArray(hex);
            }
            if (4 === rgba.length) {
              var hex = rgba.substr(1).replace(/./g, function (str) {
                return str + str;
              });
              return this.rgbHex2RgbaArray(hex);
            }
            if (7 == rgba.length) return this.rgbHex2RgbaArray(rgba.substr(1));
            if (9 == rgba.length) {
              rgba = rgba.substr(1);
              return this.argbHex2RgbaArray(rgba);
            }
          },
          HSLA2RGBA: function (h, p, q, a) {
            var r, g, b;
            return (
              0 === p
                ? (r = g = b = q)
                : ((r = this.hue2rgb(
                    (p = 2 * q - (q = q < 0.5 ? q * (1 + p) : q + p - q * p)),
                    q,
                    h + 1 / 3
                  )),
                  (g = this.hue2rgb(p, q, h)),
                  (b = this.hue2rgb(p, q, h - 1 / 3))),
              [r, g, b, a]
            );
          },
          hue2rgb: function (p, q, t) {
            return (
              t < 0 && (t += 1),
              1 < t && --t,
              t < 1 / 6
                ? p + 6 * (q - p) * t
                : t < 0.5
                ? q
                : t < 2 / 3
                ? p + (q - p) * (2 / 3 - t) * 6
                : p
            );
          },
          rgbHex2Rgba: function (hex) {
            return (
              hex.startsWith("#") && (hex = hex.slice(1)),
              Util.argbHex2Rgba("ff" + hex)
            );
          },
          argbHex2Rgba: function (hex) {
            for (
              var parts = [],
                i = 0,
                len = (hex = hex.startsWith("#") ? hex.slice(1) : hex).length;
              i < len;
              i += 2
            )
              parts.push(parseInt(hex.substr(i, 2), 16));
            return (
              parts.push((parts.shift() / 255).toFixed(2)),
              "rgba(" + parts.join(",") + ")"
            );
          },
          Opacity2Rgba: function (opacity, color) {
            var newColor = color;
            return (
              color &&
                color[3] &&
                opacity &&
                (color[3] = Math.floor(255 * opacity)),
              newColor
            );
          },
          Hex2Rgba: function (hex) {
            if ("string" != typeof hex) return !1;
            for (var parts = [], i = 0, len = hex.length; i < len; i += 2)
              parts.push(parseInt(hex.substr(i, 2), 16));
            return parts.push(parseInt(parts.shift())), parts;
          },
          rgbHex2RgbaArray: function (hex) {
            return this.rgbaHex2RgbaArray(hex + "ff");
          },
          argbHex2RgbaArray: function (hex) {
            for (var parts = [], i = 0, len = hex.length; i < len; i += 2)
              parts.push(parseInt(hex.substr(i, 2), 16) / 255);
            return parts.push(parts.shift()), parts;
          },
          rgbaHex2RgbaArray: function (color) {
            color = parseInt(color, 16);
            return [
              ((color >> 24) & 255) / 255,
              ((color >> 16) & 255) / 255,
              ((color >> 8) & 255) / 255,
              (255 & color) / 255,
            ];
          },
          isEmpty: function (obj) {
            for (var i in obj) if (obj.hasOwnProperty(i)) return !1;
            return !0;
          },
          delArrayItem: function (array, n) {
            return 0 <= n && array.splice(n, 1), array;
          },
          startsWith: function (_long, _short) {
            return _long.startsWith
              ? _long.startsWith(_short)
              : _long.substr(0, _short.length) === _short;
          },
          deleteItemFromArray: function (array, index) {
            index = Util.indexOf(array, index);
            return Util.delArrayItem(array, index);
          },
          deleteItemFromArrayByIndex: function (array, index) {
            return Util.delArrayItem(array, index);
          },
          filter: function (array, fun, context) {
            var ret = [];
            return (
              Util.each(array, function (item, i) {
                fun.call(context, item, i) && ret.push(item);
              }),
              ret
            );
          },
          indexOf: function (array, item) {
            if (!array || !array.length) return -1;
            if (array.indexOf) return array.indexOf(item);
            for (var i = 0; i < array.length; i += 1)
              if (array[i] === item) return i;
            return -1;
          },
          endsWith_: function (longStr, shortStr) {
            return longStr.endsWith
              ? longStr.endsWith(shortStr)
              : !(longStr.length < shortStr.length) &&
                  longStr.substr(longStr.length - shortStr.length) == shortStr;
          },
          bind:
            ((supportNativeBind = !1),
            Boolean(Function.prototype.bind) && (supportNativeBind = !0),
            function (fn, context) {
              var args =
                2 < arguments.length
                  ? Array.prototype.slice.call(arguments, 2)
                  : null;
              return supportNativeBind
                ? args
                  ? (args.unshift(context), fn.bind.apply(fn, args))
                  : fn.bind(context)
                : function () {
                    return fn.apply(context, args || arguments);
                  };
            }),
          setOptions: function (obj, opts) {
            return (
              (obj.opts = assign({}, obj.opts, (opts = opts || {}))), obj.opts
            );
          },
          cloneDeep: function (value, customizer, thisArg) {
            return "function" == typeof customizer
              ? this.baseClone(
                  value,
                  !0,
                  this.bindCallback(customizer, thisArg, 1)
                )
              : this.baseClone(value, !0);
          },
          baseClone: function (
            value,
            isDeep,
            customizer,
            isFunc,
            object,
            stackA,
            stackB
          ) {
            var result;
            if (
              void 0 !==
              (result = customizer
                ? object
                  ? customizer(value, isFunc, object)
                  : customizer(value)
                : result)
            )
              return result;
            if (!this.isObject(value)) return value;
            var isArr = this.isArray(value);
            if (isArr) {
              if (((result = this.initCloneArray(value)), !isDeep))
                return this.arrayCopy(value, result);
            } else {
              var tag = Object.prototype.toString.call(value),
                isFunc = "[object Function]" == tag;
              if (
                "[object Object]" != tag &&
                "[object Arguments]" != tag &&
                (!isFunc || object)
              )
                return object ? value : {};
              if (
                ((result = this.initCloneObject(isFunc ? {} : value)), !isDeep)
              )
                return this.baseAssign(result, value);
            }
            stackB = stackB || [];
            for (var length = (stackA = stackA || []).length; length--; )
              if (stackA[length] == value) return stackB[length];
            return (
              stackA.push(value),
              stackB.push(result),
              (isArr ? this.arrayEach : this.baseForOwn)(
                value,
                function (subValue, key) {
                  result[key] = Util.baseClone(
                    subValue,
                    isDeep,
                    customizer,
                    key,
                    value,
                    stackA,
                    stackB
                  );
                }
              ),
              result
            );
          },
          baseAssign: function (object, source) {
            return null == source
              ? object
              : this.baseCopy(source, Object.keys(source), object);
          },
          isObject: function (value) {
            var type = typeof value;
            return !!value && ("object" == type || "function" == type);
          },
          isObjectLike: function (value) {
            return !!value && "object" == typeof value;
          },
          isLength: function (value) {
            return (
              "number" == typeof value &&
              -1 < value &&
              value % 1 == 0 &&
              value <= 9007199254740991
            );
          },
          initCloneArray: function (array) {
            var length = array.length,
              result = new Array(length);
            return (
              length &&
                "string" == typeof array[0] &&
                Object.hasOwnProperty.call(array, "index") &&
                ((result.index = array.index), (result.input = array.input)),
              result
            );
          },
          arrayCopy: function (source, array) {
            var index = -1,
              length = source.length;
            for (array = array || Array(length); ++index < length; )
              array[index] = source[index];
            return array;
          },
          initCloneObject: function (Ctor) {
            Ctor = Ctor.constructor;
            return new (Ctor = !(
              "function" == typeof Ctor && Ctor instanceof Ctor
            )
              ? Object
              : Ctor)();
          },
          bindCallback: function (func, thisArg, argCount) {
            if ("function" != typeof func) return this.identity;
            if (void 0 === thisArg) return func;
            switch (argCount) {
              case 1:
                return function (value) {
                  return func.call(thisArg, value);
                };
              case 3:
                return function (value, index, collection) {
                  return func.call(thisArg, value, index, collection);
                };
              case 4:
                return function (accumulator, value, index, collection) {
                  return func.call(
                    thisArg,
                    accumulator,
                    value,
                    index,
                    collection
                  );
                };
              case 5:
                return function (value, other, key, object, source) {
                  return func.call(thisArg, value, other, key, object, source);
                };
            }
            return function () {
              return func.apply(thisArg, arguments);
            };
          },
          arrayEach: function (array, iteratee) {
            for (
              var index = -1, length = array.length;
              ++index < length && !1 !== iteratee(array[index], index, array);

            );
            return array;
          },
          identity: function (value) {
            return value;
          },
          createBaseFor: function (fromRight) {
            return function (object, iteratee, keysFunc) {
              for (
                var iterable = Util.toObject(object),
                  props = keysFunc(object),
                  length = props.length,
                  index = fromRight ? length : -1;
                fromRight ? index-- : ++index < length;

              ) {
                var key = props[index];
                if (!1 === iteratee(iterable[key], key, iterable)) break;
              }
              return object;
            };
          },
          baseForOwn: function (object, iteratee) {
            return Util.createBaseFor()(object, iteratee, Object.keys);
          },
          toObject: function (value) {
            return Util.isObject(value) ? value : Object(value);
          },
          baseCopy: function (source, props, object) {
            object = object || {};
            for (var index = -1, length = props.length; ++index < length; ) {
              var key = props[index];
              object[key] = source[key];
            }
            return object;
          },
          falseFn: function () {
            return !1;
          },
          emptyImageUrl:
            "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
          getTimestamp: Date.now
            ? function () {
                return Date.now();
              }
            : function () {
                return new Date().getTime();
              },
          limitExecByInterval: function (fn, time, context, ignoreWhenLock) {
            var lastRunTime_1,
              curTime_1,
              fnGetTime_1,
              wrapperFn,
              lock_1,
              args_1,
              later_1;
            return (wrapperFn = ignoreWhenLock
              ? ((lastRunTime_1 = 0),
                (fnGetTime_1 = this.getTimestamp),
                function () {
                  if ((curTime_1 = fnGetTime_1()) - lastRunTime_1 < time)
                    return !1;
                  (lastRunTime_1 = curTime_1), fn.apply(context, arguments);
                })
              : ((later_1 = function () {
                  (lock_1 = !1),
                    args_1 && (wrapperFn.apply(context, args_1), (args_1 = !1));
                }),
                function () {
                  lock_1
                    ? (args_1 = arguments)
                    : ((lock_1 = !0),
                      fn.apply(context, arguments),
                      setTimeout(later_1, time));
                }));
          },
          format: function (num, digits) {
            return num === num << 0
              ? num
              : +parseFloat(num + "").toFixed(digits || 0);
          },
          isArray:
            Array.isArray ||
            function (array) {
              return this.is(array, "array");
            },
          is: function (obj, type) {
            return (
              Object.prototype.toString
                .call(obj)
                .split(" ")[1]
                .slice(0, -1)
                .toLowerCase() === type.toLowerCase()
            );
          },
          includes:
            "function" == typeof Array.prototype.includes
              ? function (arr, val) {
                  return arr.includes(val);
                }
              : function (arr, val) {
                  return -1 !== this.indexOf(arr, val);
                },
          strHashCode: function (str) {
            var hash = 0;
            if (0 === str.length) return hash;
            for (var i = 0, len = str.length; i < len; i += 1)
              (hash = (hash << 5) - hash + str.charCodeAt(i)), (hash &= hash);
            return hash;
          },
          decode_: function (str, key) {
            key = key ? Math.ceil(parseInt(key.substr(6)) / 24) : 1;
            for (var result = "", i = 0, strlen = str.length; i < strlen; i++)
              result += String.fromCharCode(
                (str.charCodeAt(i) - 256 - key + 65535) % 65535
              );
            return result;
          },
          decodeLngLat: function (lng, lat) {
            var lngKey = (lng + "").slice(-2),
              latKey = (lat + "").slice(-2);
            (lng = lng.slice(0, -2)), (lat = lat.slice(0, -2));
            var latDir = parseInt((latKey + lngKey).slice(1)),
              lngDir = Math.ceil(latDir / 250) % 2 ? 1 : -1,
              latDir = 1 < latDir / 500 ? 1 : -1;
            return (
              (lng -= (parseInt("1" + lngKey) / 3e3) * lngDir),
              (lat -= (parseInt("1" + latKey) / 3e3) * latDir),
              new LngLat$1(
                parseFloat(lng).toFixed(5),
                parseFloat(lat).toFixed(5)
              )
            );
          },
          objHashCode: function (obj) {
            return "undefined" != typeof JSON && JSON.stringify
              ? Util.strHashCode(JSON.stringify(obj))
              : null;
          },
          stampHashCode: function (obj, hash) {
            var key = "_amap_hash";
            return (
              (!hash && obj.hasOwnProperty(key)) ||
                ((hash = Util.objHashCode(obj)) && (obj[key] = hash)),
              obj[key]
            );
          },
          parseLngLatData: function (data) {
            if (Util.isArray(data)) {
              if (!Util.isArray(data[0])) {
                var type = typeof data[0];
                return "string" == type || "number" == type
                  ? new LngLat$1(data[0], data[1])
                  : data;
              }
              for (var i = 0; i < data.length; i += 1)
                data[i] = Util.parseLngLatData(data[i]);
            }
            return data;
          },
          xy2arr: function (xys) {
            for (var r = [], i = 0, len = xys.length; i < len; i += 1)
              r[i] = [xys[i].x, xys[i].y];
            return r;
          },
          parseSize: function (data) {
            return Util.isArray(data) ? new Size(data[0], data[1]) : data;
          },
          getDeltaCenter: function (localCenter, deltaY) {
            var size,
              localDeltaCenter = [0, 0],
              deltaX = Util.getOptimalZoom(deltaY.viewState.zoom);
            return (
              localCenter && 13 <= deltaX
                ? ((size = lcs.getSize()),
                  (deltaX = deltaY.viewState.centerCoord),
                  (deltaY = lcs.getLocalByCoord([deltaX[0], deltaX[1]])),
                  (deltaX = localCenter.x - deltaY.x),
                  (deltaY = localCenter.y - deltaY.y),
                  0 != deltaX &&
                    ((deltaX *= size[0]), (localDeltaCenter[0] = deltaX)),
                  0 != deltaY &&
                    ((deltaY *= size[1]), (localDeltaCenter[1] = deltaY)))
                : localCenter &&
                  ((localDeltaCenter[0] += localCenter.center[0]),
                  (localDeltaCenter[1] += localCenter.center[1])),
              localDeltaCenter
            );
          },
          checkInZooms: function (zoom, zooms) {
            return zoom >= zooms[0] && zoom <= zooms[1];
          },
          getTileTagByZoom: function (z, optimalZoom, forceAll) {
            void 0 === forceAll && (forceAll = !1);
            z = (z = void 0 === z ? "" : z).split(",")[0] || "";
            return (
              (!forceAll && z && optimalZoom && TagMap[optimalZoom]) || "all"
            );
          },
          getTileTagByZ: function (z, optimalZoom, forceAll) {
            return (
              (!(forceAll = void 0 !== forceAll && forceAll) &&
                z &&
                optimalZoom &&
                TagMap[optimalZoom]) ||
              "all"
            );
          },
          containTag: function (tag1Number, tag2) {
            if (!tag1Number || !tag2) return !1;
            tag1Number = this.getNumberByTag(tag1Number);
            return this.getNumberByTag(tag2) <= tag1Number;
          },
          getNumberTag: function (tag) {
            var numberTag;
            switch ((tag = void 0 === tag ? "all" : tag)) {
              case "lite":
                numberTag = 0;
                break;
              case "left":
                numberTag = 1;
                break;
              default:
                numberTag = 2;
            }
            return numberTag;
          },
          getStringTag: function (tag) {
            var numberTag;
            switch ((tag = void 0 === tag ? 2 : tag)) {
              case 0:
                numberTag = NebulaTagType.LITE;
                break;
              case 1:
                numberTag = NebulaTagType.LEFT;
                break;
              default:
                numberTag = NebulaTagType.ALL;
            }
            return numberTag;
          },
          getNumberByTag: function (tag) {
            var tagNumber = 0;
            switch (tag) {
              case "lite":
                tagNumber = 0;
                break;
              case "left":
                tagNumber = 1;
                break;
              case "all":
                tagNumber = 2;
            }
            return tagNumber;
          },
        };
      !(function () {
        var lastTime = 0;
        function timeoutDefer(fn) {
          var time = +new Date(),
            timeToCall = Math.max(
              0,
              (Browser.android ? 50 : 20) - (time - lastTime)
            );
          return (
            (lastTime = time + timeToCall), globalInstance.setTimeout(fn, 50)
          );
        }
        function timeoutClear(id) {
          globalInstance.clearTimeout(id);
        }
        if (Browser.isWorkerEnv) {
          var requestFn_1 = timeoutDefer,
            cancelFn_1 = timeoutClear;
          return (
            (originUtil.requestAnimFrame = function (
              fn,
              context,
              immediate,
              element
            ) {
              if (!immediate)
                return requestFn_1(function () {
                  context
                    ? Util.bind(fn, context).call(context, element)
                    : fn();
                });
              context ? Util.bind(fn, context).call(context, element) : fn();
            }),
            (originUtil.cancelAnimFrame = function (id) {
              id && cancelFn_1.call(globalInstance, id);
            })
          );
        }
        function getPrefixed(name) {
          for (
            var fn, prefixes = ["webkit", "moz", "o", "ms"], i = 0;
            i < prefixes.length && !fn;
            i += 1
          )
            fn = globalInstance[prefixes[i] + name];
          return fn;
        }
        var requestFn =
            globalInstance.requestAnimationFrame ||
            getPrefixed("RequestAnimationFrame") ||
            timeoutDefer,
          cancelFn =
            globalInstance.cancelAnimationFrame ||
            getPrefixed("CancelAnimationFrame") ||
            getPrefixed("CancelRequestAnimationFrame") ||
            timeoutClear;
        (originUtil.requestAnimFrame = function (
          fn,
          context,
          immediate,
          element
        ) {
          if (!immediate)
            return requestFn(function () {
              context ? Util.bind(fn, context).call(context, element) : fn();
            });
          context ? Util.bind(fn, context).call(context, element) : fn();
        }),
          (originUtil.cancelAnimFrame = function (id) {
            id && cancelFn.call(globalInstance, id);
          });
      })(),
        Browser.isWorkerEnv ||
          ((originUtil.requestIdleCallback = globalInstance.requestIdleCallback
            ? function (callback, options) {
                return globalInstance.requestIdleCallback(callback, options);
              }
            : function (cb, options) {
                void 0 === options && (options = {});
                var start = Util.getTimestamp();
                return setTimeout(function () {
                  cb({
                    didTimeout: !1,
                    timeRemaining: function () {
                      return Math.max(0, 70 - (Util.getTimestamp() - start));
                    },
                  });
                }, options.timeout || 0);
              }),
          (originUtil.cancelIdleCallback = globalInstance.cancelIdleCallback
            ? function (handler) {
                return globalInstance.cancelIdleCallback(handler);
              }
            : function (id) {
                clearTimeout(id);
              }));
      var Util = originUtil;
      return Util;
    })();
  function isLngLat(obj) {
    return obj && "AMap.LngLat" === obj.className;
  }
  var CONSTS_Events = {
      MOVE_START: "movestart",
      MOVING: "moving",
      MOVE_END: "moveend",
      MOVE_ALONG: "movealong",
    },
    animationPlugin = {
      clip: null,
      clips: [],
      markerAnimation: null,
      moveTo: function (targetDuration, easing) {
        var _this = this;
        if (
          (this._map || (this._map = this._parent && this._parent.map),
          this._map && targetDuration)
        ) {
          this._initAnimation();
          this._map;
          var lastStep,
            currentStep,
            markerAnimation = this.markerAnimation,
            speed = this.getPosition(),
            positionArr = isLngLat(speed) ? speed.toJSON() : speed,
            targetPositionArr = isLngLat(targetDuration)
              ? targetDuration.toJSON()
              : targetDuration,
            _b = easing || {},
            duration = _b.duration,
            speed = _b.speed,
            easing = _b.easing,
            _b = _b.autoRotation,
            autoRotation = void 0 === _b || _b,
            targetDuration =
              duration ||
              (speed
                ? this._getDuration(speed, positionArr, targetDuration)
                : 0),
            clip = this._getClip(
              { duration: targetDuration, easing: easing || "Linear" },
              {
                x: [positionArr[0], targetPositionArr[0]],
                y: [positionArr[1], targetPositionArr[1]],
              }
            ),
            path = [
              new AMap.LngLat(positionArr[0], positionArr[1]),
              new AMap.LngLat(targetPositionArr[0], targetPositionArr[1]),
            ],
            eventType = CONSTS_Events.MOVING;
          return (
            clip.on("start", function (event) {
              var type = CONSTS_Events.MOVE_START,
                event = _this._getMoveStartEvent(type, event, path);
              _this.emit(type, event);
            }),
            clip.on("update", function (absoluteAngle) {
              var event = _this._getMovingEvent(
                  eventType,
                  absoluteAngle,
                  path,
                  0
                ),
                absoluteAngle = event.index;
              autoRotation &&
                !clip._hasSetRotation &&
                "AMap.Marker" === _this.CLASS_NAME &&
                ((clip._hasSetRotation = !0),
                (currentStep = path[absoluteAngle + 1]),
                (lastStep = path[absoluteAngle]) &&
                  currentStep &&
                  (!1 ===
                  (absoluteAngle = _this._getOrientationByLngLats(
                    lastStep,
                    currentStep
                  ))
                    ? (absoluteAngle = _this.lastAngle || 0)
                    : (_this.lastAngle = absoluteAngle),
                  _this.setOrientation(absoluteAngle))),
                _this.emit(eventType, event);
            }),
            clip.on("complete", function (event) {
              var type = CONSTS_Events.MOVE_END,
                event = _this._getMoveEndEvent(type, event, path);
              _this.emit(type, event);
            }),
            markerAnimation.addClip(clip),
            markerAnimation.start(),
            this
          );
        }
      },
      startMove: function () {
        this.markerAnimation &&
          (this._destroyClip(),
          this.markerAnimation.reset(),
          this.markerAnimation.start());
      },
      stopMove: function () {
        this.markerAnimation && this.markerAnimation.stop();
      },
      pauseMove: function () {
        this.markerAnimation && this.markerAnimation.pause();
      },
      resumeMove: function () {
        this.markerAnimation && this.markerAnimation.start();
      },
      moveAlong: function (path, totalDuration) {
        var _this = this;
        if (
          (this._map || (this._map = this._parent && this._parent.map),
          this._map && path)
        ) {
          this._initAnimation();
          this._map;
          var beforeClip,
            lastStep,
            currentStep,
            markerAnimation = this.markerAnimation,
            _d = totalDuration || {},
            speed = _d.speed,
            easing = _d.easing,
            circlable = _d.circlable,
            totalDuration = _d.delay,
            delay = void 0 === totalDuration ? 0 : totalDuration,
            totalDuration = _d.aniInterval,
            aniInterval = void 0 === totalDuration ? 0 : totalDuration,
            duration = _d.duration,
            totalDuration = _d.totalDuration,
            _d = _d.autoRotation,
            autoRotation = void 0 === _d || _d,
            clips = [],
            pathLen = path.length,
            isDurationAFunction = "function" == typeof duration,
            duration2 =
              duration || (totalDuration ? totalDuration / (pathLen - 1) : 0),
            isSpeedAFunction = "function" == typeof speed,
            isDelayAFunction = "function" == typeof delay,
            originPath = this._getOriginPath(path),
            firstPosition = originPath[0];
          this.setPosition(firstPosition);
          for (var this_1 = this, i = 0; i < pathLen - 1; i++)
            !(function (i) {
              var curPath = path[i],
                targetPath = path[i + 1],
                position = void 0,
                targetPosition = void 0,
                curSpeed = void 0,
                curDelay = void 0,
                curDuration = void 0;
              if (
                (isLngLat(curPath) && isLngLat(targetPath)
                  ? ((position = curPath.toJSON()),
                    (targetPosition = targetPath.toJSON()))
                  : curPath.position && targetPath.position
                  ? ((position = curPath.position),
                    (targetPosition = targetPath.position),
                    isLngLat(position) && (position = position.toJSON()),
                    isLngLat(targetPosition) &&
                      (targetPosition = targetPosition.toJSON()),
                    (curSpeed = targetPath.speed),
                    (curDuration = targetPath.duration),
                    (curDelay = targetPath.delay),
                    !curDuration &&
                      curSpeed &&
                      (curDuration = this_1._getDuration(
                        curSpeed,
                        position,
                        targetPosition
                      )))
                  : ((position = curPath), (targetPosition = targetPath)),
                !position || !targetPosition)
              )
                return;
              i || (lastStep = position),
                (curSpeed =
                  curSpeed || (isSpeedAFunction ? speed(i, position) : speed)),
                (curDelay =
                  curDelay || (isDelayAFunction ? delay(i, position) : delay)),
                !(curDuration =
                  curDuration ||
                  (isDurationAFunction ? duration(i, position) : duration2)) &&
                  curSpeed &&
                  (curDuration = this_1._getDuration(
                    curSpeed,
                    position,
                    targetPosition
                  ));
              var index,
                clip = this_1._getClip(
                  {
                    delay: curDelay || 0,
                    duration: curDuration,
                    easing: easing || "Linear",
                  },
                  {
                    x: [position[0], targetPosition[0]],
                    y: [position[1], targetPosition[1]],
                  }
                );
              i ||
                clip.on("start", function (event) {
                  var type = CONSTS_Events.MOVE_START,
                    event = _this._getMoveStartEvent(type, event, originPath);
                  _this.emit(type, event);
                }),
                clip.on("update", function (absoluteAngle) {
                  var type = CONSTS_Events.MOVING,
                    event = _this._getMovingEvent(
                      type,
                      absoluteAngle,
                      originPath,
                      i
                    ),
                    absoluteAngle = event.index;
                  autoRotation &&
                    !clip._hasSetRotation &&
                    "AMap.Marker" === _this.CLASS_NAME &&
                    ((clip._hasSetRotation = !0),
                    (lastStep = originPath[absoluteAngle]),
                    (currentStep = originPath[absoluteAngle + 1]),
                    lastStep &&
                      currentStep &&
                      (!1 ===
                      (absoluteAngle = _this._getOrientationByLngLats(
                        lastStep,
                        currentStep
                      ))
                        ? (absoluteAngle = _this.lastAngle || 0)
                        : (_this.lastAngle = absoluteAngle),
                      _this.setOrientation(absoluteAngle))),
                    _this.emit(type, event);
                }),
                i === pathLen - 2
                  ? clip.on(
                      "complete",
                      ((index = i + 2),
                      function (moveAlongEvent) {
                        var moveEndEvent = _this._getMoveEndEvent(
                          CONSTS_Events.MOVE_END,
                          moveAlongEvent,
                          originPath.slice(0, index)
                        );
                        _this.emit(CONSTS_Events.MOVE_END, moveEndEvent);
                        moveAlongEvent = _this._getMoveEndEvent(
                          CONSTS_Events.MOVE_ALONG,
                          moveAlongEvent,
                          originPath.slice(0, index)
                        );
                        _this.emit(CONSTS_Events.MOVE_ALONG, moveAlongEvent);
                      })
                    )
                  : clip.on(
                      "complete",
                      (function () {
                        var index = i + 2;
                        return function (moveEndEvent) {
                          moveEndEvent = _this._getMoveEndEvent(
                            CONSTS_Events.MOVE_END,
                            moveEndEvent,
                            originPath.slice(0, index)
                          );
                          _this.emit(CONSTS_Events.MOVE_END, moveEndEvent);
                        };
                      })()
                    ),
                beforeClip && beforeClip.chain(clip),
                (beforeClip = clip),
                clips.push(clip);
            })(i);
          (this.clips = clips),
            circlable &&
              markerAnimation.on("complete", function () {
                _this.setPosition(firstPosition), markerAnimation.reset();
                for (var _i = 0, clips_1 = clips; _i < clips_1.length; _i++)
                  clips_1[_i]._hasSetRotation = !1;
                setTimeout(function () {
                  markerAnimation.start();
                }, aniInterval);
              }),
            markerAnimation &&
              (markerAnimation.addClip(clips[0]),
              (this.clip = clips[0]),
              markerAnimation.start());
        }
      },
      _getDuration: function (speed, pos1, pos2) {
        return (
          ((AMap.GeometryUtil.distance(pos1, pos2) || 0) /
            (speed = speed || 1)) *
          60 *
          60
        );
      },
      _getClip: function (options, clip) {
        var _this = this,
          clip = (this.clip = new chito_2(options, clip));
        return (
          clip.on("update", function (x) {
            var y = x.keyframe,
              x = y.x,
              y = y.y;
            _this.setPosition([x, y]);
          }),
          clip
        );
      },
      _destroyClip: function () {
        var clip = this.clip,
          clips = this.clips;
        if (
          (this.markerAnimation &&
            (this.markerAnimation.removeClip(clip), clip.chain()),
          clips)
        )
          for (var _i = 0, clips_2 = clips; _i < clips_2.length; _i++)
            clips_2[_i].destroy(), 0;
        clip.destroy(), (this.clip = null), (this.clips = []);
      },
      _initAnimation: function () {
        this.markerAnimation
          ? this.markerAnimation &&
            (this._destroyClip(), this.markerAnimation.reset())
          : (this.markerAnimation = new chito_1());
      },
      _getMoveStartEvent: function (type, e, path) {
        return {
          index: 0,
          type: type,
          progress: 0,
          pos: path[0],
          target: this,
          passedPos: path[0],
          passedPath: path.slice(0, 1),
        };
      },
      _getMoveEndEvent: function (type, e, path) {
        var lastIndex = path.length - 1;
        return {
          index: lastIndex,
          type: type,
          progress: 1,
          pos: path[lastIndex],
          target: this,
          passedPos: path[lastIndex],
          passedPath: path,
        };
      },
      _getMovingEvent: function (type, e, path, i) {
        var curPosition = new AMap.LngLat(e.keyframe.x, e.keyframe.y),
          passedPath = path.slice(0, i + 1).concat(curPosition);
        return {
          index: i,
          type: type,
          progress: e.progress,
          pos: curPosition,
          target: this,
          passedPos: path[i],
          passedPath: passedPath,
        };
      },
      _getOrientationByLngLats: function (lnglat1, lnglat2) {
        return (
          isLngLat(lnglat1) ||
            (lnglat1 = new AMap.LngLat(lnglat1[0], lnglat1[1])),
          isLngLat(lnglat2) ||
            (lnglat2 = new AMap.LngLat(lnglat2[0], lnglat2[1])),
          this._getRotationByLngLats(lnglat1, lnglat2)
        );
      },
      _getOriginPath: function (path) {
        for (
          var originPath = [], _i = 0, path_1 = path;
          _i < path_1.length;
          _i++
        ) {
          var curPosition = path_1[_i];
          isLngLat(curPosition) || Array.isArray(curPosition)
            ? originPath.push(curPosition)
            : curPosition.position && originPath.push(curPosition.position);
        }
        return originPath;
      },
    };
  AMap.extend(AMap.Marker, animationPlugin),
    AMap.extend(AMap.Text, animationPlugin),
    AMap.extend(AMap.LabelMarker, animationPlugin);
})();
