import * as dayjs from 'dayjs'
import localizedFormat = require('dayjs/plugin/localizedFormat')
import timezone = require('dayjs/plugin/timezone')
import utc = require('dayjs/plugin/utc')
import ptBR = require('dayjs/locale/pt-br')

dayjs.extend(timezone)
dayjs.extend(localizedFormat)
dayjs.extend(utc)
dayjs.locale(ptBR)

export const getNow = (): dayjs.Dayjs => dayjs()

export const getToday = (): dayjs.Dayjs => dayjs().startOf('day')

export const getTodayUtc = (): dayjs.Dayjs => dayjs().utc().startOf('day')

export const parseDate = (
  date: string | dayjs.Dayjs | Date,
  options: {
    format?: string
    timezone?: string
  } = {},
) => {
  let parsedDate = dayjs(date, options.format)
  if (options.timezone) parsedDate = parsedDate.tz(options.timezone)
  return parsedDate
}

export const parseDateUtc = (date: string | dayjs.Dayjs | Date, format?: string) =>
  dayjs(date, format).utc()

export type Dayjs = dayjs.Dayjs
