import React, { useState, useEffect } from 'react'
import { FormattedMessage } from '../../../translate/fake_react_intl'
import { addMinutes, toMiliseconds } from '../../../helpers/momentHelpers'
import FromTo from './fromTo'

function FromToDay({ day, i, setDaysConfig, daysConfig, setAnyOverlaps }) {
  const handleChange = (i, i2, key, val) => {
    setDaysConfig(v =>
      ({
        ...v,
        [i]: {
          ...v[i],
          config: v[i].config.map((el, ind) =>
            ind === i2 ? { ...el, [key]: val.format('HH:mm') } : el,
          ),
        },
      }),
    )
  }

  return (
    <>
      {i === 0 && (
        <div className="fromtosTitle mb-2">
          <div>
            <FormattedMessage id="Start" />
          </div>
          <div>
            <FormattedMessage id="End" />
          </div>
        </div>
      )}
      {day.config.map((fromTo, i2) => (
        <FromTo
          i2={i2}
          key={i2}
          day={day}
          daysConfig={daysConfig}
          setDaysConfig={setDaysConfig}
          handleChange={handleChange}
          fromTo={fromTo}
          i={i}
          setAnyOverlaps={setAnyOverlaps}
        />
      ))}
    </>
  )
}
export default FromToDay
