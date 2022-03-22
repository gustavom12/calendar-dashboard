import moment from 'moment'

export const buildMonth = selectedMonth => {
  let startOfMonth = selectedMonth.clone().startOf('month')
  let finishOfMonth = selectedMonth.clone().endOf('month')
  const days = []
  // Find the first date to show on calendary
  while (startOfMonth.day() !== 0) {
    startOfMonth.subtract(1, 'days')
  }
  // Find the last date to show on calendary
  while (finishOfMonth.day() !== 6) {
    finishOfMonth.add(1, 'days')
  }
  // Push days to calendary
  while (startOfMonth.isSameOrBefore(finishOfMonth)) {
    days.push({
      date: moment(startOfMonth),
      isInCurrentMonth: selectedMonth.month() === startOfMonth.month(),
    })
    startOfMonth.add(1, 'days')
  }
  return days
}
