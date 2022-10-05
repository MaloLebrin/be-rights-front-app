import { ThemeEnum } from '@/types/globals'
import { useMainStore } from '~~/store/main'

export default function mainHook() {
  const mainStore = useMainStore()
  const { setTheme } = mainStore

  async function toggleTheme() {
    if (mainStore.getTheme === ThemeEnum.DARK) {
      document.getElementById('app')?.classList.remove(ThemeEnum.DARK)
      document.getElementById('portal-target')?.classList.remove(ThemeEnum.DARK)
      setTheme(ThemeEnum.LIGHT)
    } else {
      setTheme(ThemeEnum.DARK)
      document.getElementById('app')?.classList.add(ThemeEnum.DARK)
      document.getElementById('portal-target')?.classList.add(ThemeEnum.DARK)
    }
  }

  function setThemeClass(userTheme: ThemeEnum) {
    if (userTheme === ThemeEnum.LIGHT) {
      document.getElementById('app')?.classList.remove(ThemeEnum.DARK)
      document.getElementById('portal-target')?.classList.remove(ThemeEnum.DARK)
      setTheme(ThemeEnum.LIGHT)
    } else {
      setTheme(ThemeEnum.DARK)
      document.getElementById('app')?.classList.add(ThemeEnum.DARK)
      document.getElementById('portal-target')?.classList.add(ThemeEnum.DARK)
    }
  }

  return {
    setThemeClass,
    toggleTheme,
  }
}
