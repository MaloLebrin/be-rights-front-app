import { DateFormatEnum } from "~/types/Date"

export default function dateHook() {

	function getDate(date: Date, format?: DateFormatEnum) {
		const options: any = {}

		switch (format) {
			case DateFormatEnum.DDMMYYYY:
				break

			case DateFormatEnum.DAYMONTHYEAR:
				options.weekday = "long"
				options.year = "numeric"
				options.month = "long"
				break

			case DateFormatEnum.DDMM:
				options.month = 'numeric'
				options.day = 'numeric'
				break

			default:
				options.day = "numeric"
				options.year = "numeric"
				options.month = "numeric"
		}

		return date.toLocaleDateString("fr-Fr", options)
	}

	return {
		getDate
	}
}