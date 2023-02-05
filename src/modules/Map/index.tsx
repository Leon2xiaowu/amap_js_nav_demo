import "./Map.css";
import { useEffect, useState } from "react";
import { rxLoadScript, rxDriving, randomAlphaNumeric } from "./toolkit";
import { concatMap, filter, map, Subject, tap } from "rxjs";
import {
  destroyForMapId,
  MapPool,
  RoutePool,
  initZoomAndCenterControll
} from "./extend";
// 导出对应的扩展对象
export { defaultGetPath, getRoute } from "./extend";
interface MapProps {
  mapId?: string;
  onload?: () => any;
}

function Map(props: MapProps) {
  const [isFail, setFail] = useState(false);
  const { mapId } = props;
  const renderMapId = mapId || randomAlphaNumeric(6);
  const mapeExistied = mapId && MapPool[mapId];
  const mapOption = {
    mapStyle: "amap://styles/97b4e45076fa5c286fff2de0d04463eb",
    viewMode: "2D"
  };

  const initMap = (Map: typeof AMap, mapId: string) => {
    return new Map.Map(
      document.getElementById(mapId) as HTMLDivElement,
      mapOption
    );
  };

  const saveMapVm = (mapVm: AMap.Map) => {
    MapPool[renderMapId] = mapVm;
  };

  const onloadCallback = () => {
    try {
      typeof props?.onload === "function" && props.onload();
    } catch (error) {
      console.error("onload callback error: ", error);
    }
  };

  // 初始化地图
  useEffect(() => {
    let unsubscribeZC: () => void;
    const loadObserver = rxLoadScript()
      .pipe(
        filter(() => {
          if (mapeExistied) {
            console.warn(`map caontainer id ${mapId} has already existing`);
          }
          return !mapeExistied;
        }),
        map((Map) => initMap(Map, renderMapId)),
        tap(saveMapVm),
        tap(onloadCallback)
      )
      .subscribe({
        next(mapvm) {
          unsubscribeZC = initZoomAndCenterControll({
            mapvm
          });
          console.warn(" Map 初始化成功");
          // loaderSubject.next(AMap);
        },
        error(e) {
          console.error("Map 初始化错误", e);
          setFail(true);
        }
      });

    return () => {
      loadObserver.unsubscribe();
      const mapVm = MapPool[renderMapId];
      if (mapVm) {
        destroyForMapId(renderMapId);
      }
      unsubscribeZC && unsubscribeZC();
    };
  }, []);

  const mapDom = (
    <div className="map-container" id={renderMapId}>
      {isFail ? "加载错误" : ""}
    </div>
  );
  // const emptyDom = <div></div>;

  return mapDom;
}

export default Map;
