//import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';
import { TZDate } from '@date-fns/tz';
import { format, startOfWeek, startOfDay, addDays } from 'date-fns';
// import {
//   startOfMonth,
//   addMonths,
//   endOfMonth,
//   parseISO,
//   startOfDay,
//   endOfDay,
//   isSameDay,
//   isWithinInterval,
// } from 'date-fns';
import { Timestamp, timestampDate, timestampMs } from '@bufbuild/protobuf/wkt';

export const convertProtobufTimestampToDate = (
  timestamp?: Timestamp,
  timezone?: string,
): Date | null => {
  if (!timestamp) return null;

  return timezone ? new TZDate(timestampMs(timestamp), timezone) : timestampDate(timestamp);
};

type DateTextPattern = 'MMM d, yyyy, h:mm a' | 'yyyy-MM-dd HH:mm';
export const formatDate = (date: Date | null, pattern: DateTextPattern): string => {
  if (!date) return '';
  return format(date, pattern);
};

type PredefinedDate =
  | 'startOf29DaysAgo'
  | 'startOfCurrentWeek'
  | 'startOfYesterday'
  | 'startOfToday'
  | 'now'
  | 'startOfTomorrow';
const getTimezoneNow = (timezone?: string) =>
  timezone ? new TZDate(new Date(), timezone) : new Date();
const predefinedDateMap: Record<PredefinedDate, (timezone?: string) => Date> = {
  startOf29DaysAgo: (timezone?: string) => startOfDay(addDays(getTimezoneNow(timezone), -29)),
  startOfCurrentWeek: (timezone?: string) => startOfWeek(getTimezoneNow(timezone)),
  startOfYesterday: (timezone?: string) => startOfDay(addDays(getTimezoneNow(timezone), -1)),
  startOfToday: (timezone?: string) => startOfDay(getTimezoneNow(timezone)),
  now: (timezone?: string) => getTimezoneNow(timezone),
  startOfTomorrow: (timezone?: string) => startOfDay(addDays(getTimezoneNow(timezone), 1)),
};
export const getPredefinedDate = (predefined: PredefinedDate, timezone?: string): Date =>
  predefinedDateMap[predefined](timezone);
