import Api from "~~/helpers/api"

declare module '#app' {
  interface NuxtApp {
    $isProductionMode: boolean
    $getApiUrl: string
    $api(): Api
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $isProductionMode: boolean
    $getApiUrl: string
    $api(): Api
  }
}

export { }
