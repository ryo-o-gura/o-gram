import dayjs from 'dayjs'

export const getDate = (timestamp: number) => {
  const now = dayjs()
  const argTime = dayjs(timestamp)
  const diff = now.diff(argTime) / 1000

  if (diff < 60 ** 1) return now.diff(argTime, 'second') + '秒前'
  else if (diff < 60 ** 2) return now.diff(argTime, 'minute') + '分前'
  else if (diff < 60 ** 3) return now.diff(argTime, 'hour') + '時間前'
  else if (diff < 60 ** 4) return now.diff(argTime, 'day') + '日前'
}
