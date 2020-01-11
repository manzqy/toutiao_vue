export const dateform = (time, rule) => {
  time = new Date(time)
  rule = rule || '/'
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  let day = time.getDate()
  return `${year}${rule}${month}${rule}${day}`
}
