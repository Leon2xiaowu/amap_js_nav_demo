import "@amap/amap-jsapi-types";
import { ZCOption } from "../modules/Map/extend";

declare global {
  namespace AMap {
    interface Map {
      /**
       * setZoomAndCenter 控制器
       *
       * create with initZoomAndCenterControll
       */
      _$setZoomAndCenter?: (param: ZCOption) => void;
    }
  }

  interface Window {
    /** 高德地图js sec key */
    _AMapSecurityConfig: {
      securityJsCode: string
    };
  }
}
