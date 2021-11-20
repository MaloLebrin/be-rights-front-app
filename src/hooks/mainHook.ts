import { storeToRefs } from "pinia"
import useMainStore from "@/store/mainStore"
import { ThemeEnum } from "@/types/globals"

export default function mainHook() {
	const mainStore = useMainStore()
	const { theme } = storeToRefs(mainStore)

	async function toggleTheme() {
		const themeLocalStorage = theme.value
		if (themeLocalStorage === ThemeEnum.LIGHT) {
			document.getElementById('app')?.classList.remove(ThemeEnum.DARK)
			theme.value = ThemeEnum.LIGHT
		} else {
			theme.value = ThemeEnum.DARK
			document.getElementById('app')?.classList.add(ThemeEnum.DARK)
		}
	}

	function setThemeClass(userTheme: ThemeEnum) {
		if (userTheme === ThemeEnum.LIGHT) {
			document.getElementById('app')?.classList.remove(ThemeEnum.DARK)
			theme.value = ThemeEnum.LIGHT
		} else {
			theme.value = ThemeEnum.DARK
			document.getElementById('app')?.classList.add(ThemeEnum.DARK)
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