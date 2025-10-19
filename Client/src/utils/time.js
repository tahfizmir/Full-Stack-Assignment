import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);

export function toUserTZ(isoString, tz) {
  return dayjs(isoString).tz(tz).format('YYYY-MM-DD HH:mm');
}

export function nowInTZ(tz) {
  return dayjs().tz(tz).format();
}
