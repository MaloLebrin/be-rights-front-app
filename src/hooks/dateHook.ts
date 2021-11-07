import { DateFormatEnum } from "~/types/Date"

export default function dateHook() {

	function getDate(date: Date, format?: DateFormatEnum) {
		const options: any = {
			year: "numeric",
			month: "numeric",
			day: "numeric"
		}

		switch (format) {
			case DateFormatEnum.DDMMYYYY:
				break

			case DateFormatEnum.DAYMONTHYEAR:
				options.weekday = "long"
				options.year = "numeric"
				options.month = "long"
				break
		}

		return date.toLocaleDateString("fr-Fr", options)
	}

	return {
		getDate
	}
}