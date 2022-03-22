import moment from 'moment'
import 'moment-duration-format'

export const addMinutes = (str = '00:00', minutes, format = 'hh:mm') => {
  let hhmm = str.split('-')[1] ? str.split('-')[1] : str
  let days = str.split('-')[0]
  let minutes1 = Number(hhmm.split(':')[1])
  if (days && days !== 'undefined') minutes1 += Number(days) * 24 * 60
  minutes1 += Number(hhmm.split(':')[0]) * 60
  return moment.duration((minutes1 + minutes) * 60000).format(format)
}

export const toMiliseconds = (str = '00-00:00', timezone = 0) => {
  let hhmm = str.split('-')[1]
  let days = str.split('-')[0]
  if (!hhmm) {
    hhmm = str
    days = null
  }
  let minutes1 = Number(hhmm.split(':')[1])
  minutes1 += Number(hhmm.split(':')[0]) * 60
  // console.log(str,days, hhmm, Number(days) * 24 * 60, Number(hhmm.split(':')[0]) * 60, Number(hhmm.split(':')[1]), )
  if (days) minutes1 += Number(days) * 24 * 60
  return moment.duration((minutes1 + timezone) * 60000).asMilliseconds()
}

export const milisecondsToFormat = (mls = 0, str = 'HH:mm') => moment.duration(mls).format(str)
