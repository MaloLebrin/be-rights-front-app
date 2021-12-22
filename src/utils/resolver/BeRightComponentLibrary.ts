import { ComponentResolver } from "./Resolver.types"

const components = [
	'BAccordion',
	'BBadge',
	'BButton',
	'BCard',
	'BCardModal',
	'BCheckbox',
	'BDropdown',
	'BField',
	'BFileInput',
	'BInput',
	'BLink',
	'BLoader',
	'BMessage',
	'BNumberInput',
	'BRadio',
	'BSelect',
	'BSkeleton',
	'BSwitch',
	'BTable',
	'BTableColumn',
	'BTag',
	'BToast',
	'BTooltip',
]
/**
 * Resolver for be right Vue3 component library
 *
 * @link https://github.com/MaloLebrin/be-right-Vue3-comp-lib
 */
export function BeRightUiResolver(): ComponentResolver {
	return {
		type: 'component',
		resolve: (name: string) => {
			if (components.includes(name))
				return { importName: name, path: 'be-right-vue3-lib' }
		}
	}
}