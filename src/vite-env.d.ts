/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 高德地图js key */
  readonly VITE_AMap_Key: string
  /** Security_Js_Code 应该放到ng上处理 */
  readonly VITE_AMap_Security_Js_Code: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}