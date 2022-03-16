import { storeToRefs } from "pinia"
import { ThemeEnum } from "@/types/globals"
import { useMainStore } from "@/store"

export default function mainHook() {
  const mainStore = useMainStore()
  const { theme } = storeToRefs(mainStore)

  async function toggleTheme() {
    const themeLocalStorage = theme.value
    if (themeLocalStorage === ThemeEnum.DARK) {
      document.getElementById('app')?.classList.remove(ThemeEnum.DARK)
      document.getElementById('portal-target')?.classList.remove(ThemeEnum.DARK)
      theme.value = ThemeEnum.LIGHT
    } else {
      theme.value = ThemeEnum.DARK
      document.getElementById('app')?.classList.add(ThemeEnum.DARK)
      document.getElementById('portal-target')?.classList.add(ThemeEnum.DARK)
    }
  }

  function setThemeClass(userTheme: ThemeEnum) {
    if (userTheme === ThemeEnum.LIGHT) {
      document.getElementById('app')?.classList.remove(ThemeEnum.DARK)
      document.getElementById('portal-target')?.classList.remove(ThemeEnum.DARK)
      theme.value = ThemeEnum.LIGHT
    } else {
      theme.value = ThemeEnum.DARK
      document.getElementById('app')?.classList.add(ThemeEnum.DARK)
      document.getElementById('portal-target')?.classList.add(ThemeEnum.DARK)
    }
  }


  function isProductionMode() {
    return import.meta.env.MODE === 'production'
  }

  return {
    setThemeClass,
    isProductionMode,
    toggleTheme,
  }
}