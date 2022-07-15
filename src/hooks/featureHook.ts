export default function featureHook() {
  function isProductionMode() {
    return import.meta.env.MODE === 'production'
  }

  function isDarkModeEnabled() {
    console.log(import.meta.env.VITE_FEATURE_ENABLED_DARKMODE, '<==== import.meta.env.VITE_FEATURE_ENABLED_DARKMODE')
    return import.meta.env.VITE_FEATURE_ENABLED_DARKMODE
  }

  return {
    isProductionMode,
    isDarkModeEnabled,
  }
}
