import { configure } from 'vee-validate'

configure({
	generateMessage: context => {
		return `Le champ ${context.field} est invalide`
	},
})
