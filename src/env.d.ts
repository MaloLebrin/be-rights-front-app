/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_DEV: boolean
  readonly VITE_PROD: boolean
  readonly VITE_MODE: string
  readonly VITE_API_URL: string
  readonly VITE_FEATURE_ENABLED_DARKMODE: boolean
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
