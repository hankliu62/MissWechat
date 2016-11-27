const zerofill = function (val, digit = 1) {
  const compareNumber = Math.pow(10, digit)
  return val >= compareNumber ? val : new Array(digit).map(function () { return '0' }) + val
}

const translate24HourTo12 = function (hour) {
  if (hour === 0) {
    return 12
  }

  if (hour > 12) {
    return hour - 12
  }

  return hour
}

export const formatDate = function (time, formater) {
  const date = new Date(time)
  const year = date.getFullYear()
  const shortYear = year % 100
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const milliseconds = date.getMilliseconds()

  let formatedDate = formater
  return formatedDate.replace('YYYY', year).replace('YY', shortYear).replace(
    'MM', zerofill(month)).replace('M', month).replace('DD', zerofill(day)).replace(
    'D', day).replace('HH', zerofill(hours)).replace('H', hours).replace(
    'hh', zerofill(translate24HourTo12(hours))).replace('h', translate24HourTo12(hours)).replace(
    'mm', zerofill(minutes)).replace('m', minutes).replace('ss', zerofill(seconds)).replace(
    's', seconds).replace('SSS', zerofill(milliseconds, 2)).replace('SS', zerofill(milliseconds)).replace(
    'S', milliseconds)
}
