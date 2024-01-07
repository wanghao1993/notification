import * as dayjs from 'dayjs';

export function formateDate(date: Date, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date).format(format);
}
