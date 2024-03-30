import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone'; // dependent on utc plugin

dayjs.extend(utc);
dayjs.extend(timezone);
export function formateDate(date: Date, format = 'YYYY-MM-DD HH:mm:ss') {
  const tz = dayjs.tz.guess();
  return dayjs.tz(date, tz).format(format);
}
