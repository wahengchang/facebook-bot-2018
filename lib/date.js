
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

module.exports = {formatDate}