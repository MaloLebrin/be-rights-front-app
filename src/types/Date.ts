export enum DateFormatEnum {
  DDMMYYYY = 'DDMMYYYY',
  DAYMONTHYEAR = 'DAYMONTHYEAR',
  DDMM = 'DDMM',
}

export interface Period {
  end: Date
  start: Date
}
