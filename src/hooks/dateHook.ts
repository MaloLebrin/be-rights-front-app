import dayjs from 'dayjs'
import { DateFormatEnum } from '@/types/Date'

export default function dateHook() {
  function getDate(date: string, format?: DateFormatEnum) {
    const options: any = {}

    switch (format) {
      case DateFormatEnum.DDMMYYYY:
        break

      case DateFormatEnum.DAYMONTHYEAR:
        options.weekday = 'long'
        options.year = 'numeric'
        options.month = 'long'
        break

      case DateFormatEnum.DDMM:
        options.month = 'numeric'
        options.day = 'numeric'
        break

      default:
        options.day = 'numeric'
        options.year = 'numeric'
        options.month = 'numeric'
    }

    return new Date(date).toLocaleDateString('fr-Fr', options)
  }

  function toFormat(date: Date | string, format: string) {
    return dayjs(date).format(format)
  }

  return {
    getDate,
    toFormat,
  }
}
