import React, { useEffect, useMemo, useState } from 'react'
import User from '../../../entities/user'
import { EventCalendar } from '../../../entities/eventCalendar'
import { buildMonth } from '../helpers/buildMonth'
import Month from './components/month'
import ConfigModal from './components/configModal'
import { addMinutes, toMiliseconds, milisecondsToFormat } from '../helpers/momentHelpers'

const parseConfig = (elem, timezone = 0, toUTC = false) => {
  const arr = []
  Object.entries(elem).forEach(day => {
    if (day[1].active) {
      day[1].config.forEach(el => {
        let from = addMinutes(
          `${day[0]}-${el.fromFormat}`,
          toUTC ? -timezone : timezone,
          'dd-hh:mm',
        )
        const thisDay = Number(from.split("-")[0])
        let to = addMinutes(`${day[0]}-${el.toFormat}`, toUTC ? -timezone : timezone, 'dd-hh:mm')
        const tomls = toMiliseconds(to)
        const toMax = toMiliseconds(`${Number(thisDay) + 1}-00:00`)
        const fromMls = toMiliseconds(to)
        const fromMin = toMiliseconds(`${Number(thisDay)}-00:00`)
        // console.log({
        //   toMax,
        //   day: thisDay,
        //   from,
        //   to,
        //   tomaxstr: milisecondsToFormat(toMax, 'dd-hh:mm'),
        //   fromMinstr: milisecondsToFormat(toMax, 'dd-hh:mm'),
        //   fromMin
        // })
        if (fromMls < fromMin) {
          arr.push({
            from: `${Number(thisDay)}-00:00`,
            to
          })
        } else if (tomls > toMax) {
          arr.push({
            to: `${Number(thisDay) + 1}-00:00`,
            from
          })
          arr.push({
            to,
            from: `${Number(thisDay) + 1}-00:00`
          })
        }
        else{
          arr.push({
            from,
            to,
          })
        }
      })
    }
  })
  return arr
}

const parseToFront = (data, daysConfig) => {
  const cloned = { ...daysConfig }
  Object.entries(cloned).forEach(v => {
    v[1].default = true
    v[1].config = [{ fromFormat: '9:00', toFormat: '18:00' }]
  })
  data.forEach(el => {
    if (cloned[Number(el.from.split('-')[0])].default)
      cloned[Number(el.from.split('-')[0])] = {
        default: false,
        active: true,
        day: Number(el.from.split('-')[0]),
        config: [{ fromFormat: el.from.split('-')[1], toFormat: el.to.split('-')[1] }],
      }
    else {
      if (cloned[Number(el.from.split('-')[0])].config.length) {
        // console.log(cloned[Number(el.from.split('-')[0])].config, [
        //   ...cloned[Number(el.from.split('-')[0])].config,
        //   { fromFormat: el.from.split('-')[1], toFormat: el.to.split('-')[1] },
        // ])
        cloned[Number(el.from.split('-')[0])] = {
          default: false,
          active: true,
          day: Number(el.from.split('-')[0]),
          config: [
            ...cloned[Number(el.from.split('-')[0])].config,
            { fromFormat: el.from.split('-')[1], toFormat: el.to.split('-')[1] },
          ],
        }
      }
    }
  })
  return cloned
}

function Availability({
  selectedMonth,
  setSelectedMonth,
  intl,
  selectedDay,
  setSelectedDay,
  timezone,
  setTimezone,
}) {
  const userClass = new User()
  const [configModal, setConfigModal] = useState(false)
  const [configId, setConfigId] = useState({ userId: null, configId: null })
  const [daysConfig, setDaysConfig] = useState({
    0: {
      default: true,
      active: false,
      day: 0,
      config: [{ fromFormat: '9:00', toFormat: '18:00' }],
    },
    1: {
      default: true,
      active: false,
      day: 1,
      config: [{ fromFormat: '9:00', toFormat: '18:00' }],
    },
    2: {
      default: true,
      active: false,
      day: 2,
      config: [{ fromFormat: '9:00', toFormat: '18:00' }],
    },
    3: {
      default: true,
      active: false,
      day: 3,
      config: [{ fromFormat: '9:00', toFormat: '18:00' }],
    },
    4: {
      default: true,
      active: false,
      day: 4,
      config: [{ fromFormat: '9:00', toFormat: '18:00' }],
    },
    5: {
      default: true,
      active: false,
      day: 5,
      config: [{ fromFormat: '9:00', toFormat: '18:00' }],
    },
    6: {
      default: true,
      active: false,
      day: 6,
      config: [{ fromFormat: '9:00', toFormat: '18:00' }],
    },
  })
  const resetWithTimezone = daysconfig => {
    const arr = parseConfig(daysconfig, timezone)
    console.log({arr, daysConfig, parseToFront: parseToFront(arr, daysConfig)})
    if (arr) setDaysConfig(parseToFront(arr, daysConfig))
  }
  const [UTCconfig, setUTCconfig] = useState([])
  useEffect(() => {
    const eventClass = new EventCalendar()
    userClass.currentAccount().then(res => {
      setConfigId(v => ({ ...v, userId: res._id }))
      eventClass
        .getAvailability(res._id)
        .then(data => {
          setConfigId(v => ({ ...v, configId: data._id }))
          if (data?.config) {
            setUTCconfig(data?.config)
            resetWithTimezone(parseToFront(data.config, daysConfig))
          }
        })
        .catch(err => console.log(err))
    })
  }, [])

  useEffect(() => {
    resetWithTimezone(parseToFront(UTCconfig, daysConfig))
  }, [timezone])

  const days = useMemo(() => {
    return buildMonth(selectedMonth)
  }, [selectedMonth])
  return (
    <>
      <Month
        intl={intl}
        days={days}
        daysConfig={daysConfig}
        setSelectedMonth={setSelectedMonth}
        selectedMonth={selectedMonth}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        setConfigModal={setConfigModal}
        timezone={timezone}
        setTimezone={setTimezone}
      />
      <ConfigModal
        daysConfig={daysConfig}
        configModal={configModal}
        setConfigModal={setConfigModal}
        setDaysConfig={setDaysConfig}
        timezone={timezone}
        configId={configId}
        parseConfig={parseConfig}
      />
    </>
  )
}
export default Availability
