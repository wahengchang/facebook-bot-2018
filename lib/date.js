
function formatDate(date) {
  const monthList = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ]

  const day = date.getDate()
  const monthIndex = date.getMonth()
  const year = date.getFullYear()

  return year + ' ' + monthList[monthIndex] + ' ' + day
}

function turnDateToStr(_date){
  if(!_date || typeof _date !== 'object') return ''

  const day = _date.getDate()
  const monthIndex = _date.getMonth() + 1
  const year = _date.getFullYear()

  return year + '-' + monthIndex + '-' + day
}

function getBeforeDate(num){
  var date = (new Date())
  date.setDate(date.getDate() - num)

  return date
}

module.exports = {formatDate, turnDateToStr, getBeforeDate}