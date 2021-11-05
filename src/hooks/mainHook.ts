import { storeToRefs } from "pinia"
import { useMainStore } from "~/store/mainStore"
import { ThemeEnum } from "~/types/globals"

export default function mainHook() {
	const mainStore = useMainStore()
	const { theme } = storeToRefs(mainStore)

	async function setThemeClass() {
		const themeLocalStorage = localStorage.theme
		if (themeLocalStorage === ThemeEnum.DEFAULT) {
			document.getElementById('app')?.classList.remove(ThemeEnum.DARK)
			theme.value = ThemeEnum.DEFAULT
		} else {
			theme.value = ThemeEnum.DARK
			document.getElementById('app')?.classList.add(ThemeEnum.DARK)
		}
	}

	function setLightTheme() {
		document.getElementById('app')?.classList.remove(ThemeEnum.DARK)
		theme.value = ThemeEnum.DEFAULT
		localStorage.theme = ThemeEnum.DEFAULT
	}

	function toggleThemeApp() {
		if (theme.value === ThemeEnum.DARK) {
			document.getElementById('app')?.classList.remove(ThemeEnum.DARK)
			theme.value = ThemeEnum.DEFAULT
			localStorage.theme = ThemeEnum.DEFAULT
		} else if (theme.value === ThemeEnum.DEFAULT) {
			document.getElementById('app')?.classList.add(ThemeEnum.DARK)
			theme.value = ThemeEnum.DARK
			localStorage.theme = ThemeEnum.DARK
		}
	}





	return {
		setThemeClass,
		toggleThemeApp,
		setLightTheme,
	}
}