import { useEffect, useRef, useState } from "react";
import {
  concatMap,
  delay,
  distinctUntilChanged,
  filter,
  from,
  map,
  mergeMap,
  Observable,
  Observer,
  of,
  Subject,
  Subscription,
  tap
} from "rxjs";
import Map, { getRoute, defaultGetPath } from "../../modules/Map";
import Route from "../../modules/Route";
import "./demo.css";
import { line1, calcPointInterval } from "../../../test/mock/line";

function mockHTTPRequest(point: { location: AMap.Vector2; interval: number }) {
  return of(point).pipe(delay(point.interval));
}

export default function Demo() {
  const mapId = "carmap";
  const origin: AMap.Vector2 = line1.start as AMap.Vector2;
  const destination: AMap.Vector2 = line1.end as AMap.Vector2;
  const [grasping, setGraspStatus] = useState(false);
  const isGrasping = useRef(false);
  let routeSubscription: Subscription;

  /** 手动更新point */
  const points = calcPointInterval(line1.path);
  const MockPointObserver = new Subject();
  const nextPoint = () => {
    const first = points.shift();
    if (first) {
      console.log(JSON.stringify(first));
      MockPointObserver.next(first.location);
    } else {
      MockPointObserver.complete();
    }
  };

  const mockReceiveNewPoint = (route: Route) => {
    return (
      // MockPointObserver
      from(points)
        .pipe(concatMap((point) => mockHTTPRequest(point)))
        .pipe(
          distinctUntilChanged((previous, current) => {
            return previous.location.join(",") === current.location.join(",");
          }),
          concatMap((point) => {
            return route.updatePathPoint(point, {
              follow: true,
              // TODO: 自动偏航纠正
              autoGrasp: false,
              getGraspPath: (point: AMap.LngLatLike) => {
                isGrasping.current = true;
                setGraspStatus(true);
                return defaultGetPath(point, destination);
              }
            });
          })
        )
    );
  };
  const mapInitLoad = () => {
    routeSubscription = getRoute({
      origin,
      destination,
      mapId,
      point: origin,
      isDraw: true,
      debug: true
    })
      .pipe(
        mergeMap((route) => mockReceiveNewPoint(route)),
        tap(() => {
          // 上层控制view zoom level
          // 可以在页面中显示出当前走的一段路和即将走的一段路
          // Next: 计算需要显示的地图缩放等级（）
          // FIXME: 这个 zoomLevel 的值还需要有逻辑去计算
          // move() 的时候接收zoom参数
          // 1. 待接驾的时候显示司机到乘客
          // 2. 已上车的zoom包括司机位置与终点（在小缩放等级下，拐弯、S弯是否要处理）
          // const zoomLevel = 16;
        })
      )
      .subscribe({
        next(routePath) {
          // 隐藏重新规划loading
          if (isGrasping.current) {
            setGraspStatus(false);
          }
        },
        error(e) {
          console.error("DEMO 加载错误", e);
        }
      });
  };

  useEffect(() => {
    return () => {
      routeSubscription?.unsubscribe();
    };
  }, []);

  return (
    <div className="map-part">
      <Map mapId={mapId} onload={mapInitLoad} />
      <div className="test-btns">
        <button onClick={nextPoint}>更新新的坐标点</button>
      </div>
      {grasping ? <div className="grasp-refresh">重新规划中..</div> : ""}
    </div>
  );
}
