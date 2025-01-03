import { TZDate } from '@date-fns/tz';
import { format, startOfWeek, startOfDay, addDays } from 'date-fns';
import { Timestamp, timestampDate, timestampMs } from '@bufbuild/protobuf/wkt';

export const convertProtobufTimestampToDate = (
  timestamp?: Timestamp,
  timezone?: string,
): Date | null => {
  if (!timestamp) return null;

  return timezone ? new TZDate(timestampMs(timestamp), timezone) : timestampDate(timestamp);
};

export type DateTextPattern = 'MMM d, yyyy, h:mm a' | 'yyyy-MM-dd HH:mm';
export const formatDate = (date: Date | null, pattern: DateTextPattern): string => {
  if (!date) return '';
  return format(date, pattern);
};

/**
 *
 * @param timezone 타임존이 주어지면 해당 타임존의 현재 시간을 반환하고, 주어지지 않으면 로컬 타임존의 현재 시간을 반환한다.
 * @returns TZDate
 */
const getTimezonedNow = (timezone?: string) => new TZDate(new Date(), timezone);

type PredefinedDate =
  | 'startOf29DaysAgo'
  | 'startOfCurrentWeek'
  | 'startOfYesterday'
  | 'startOfToday'
  | 'now'
  | 'startOfTomorrow';
const predefinedDateMap: Record<PredefinedDate, (timezone?: string) => Date> = {
  startOf29DaysAgo: (timezone?: string) => startOfDay(addDays(getTimezonedNow(timezone), -29)),
  startOfCurrentWeek: (timezone?: string) =>
    startOfWeek(getTimezonedNow(timezone), { weekStartsOn: 1 }),
  startOfYesterday: (timezone?: string) => startOfDay(addDays(getTimezonedNow(timezone), -1)),
  startOfToday: (timezone?: string) => startOfDay(getTimezonedNow(timezone)),
  now: (timezone?: string) => getTimezonedNow(timezone),
  startOfTomorrow: (timezone?: string) => startOfDay(addDays(getTimezonedNow(timezone), 1)),
};
export const getPredefinedDate = (predefined: PredefinedDate, timezone?: string): Date =>
  predefinedDateMap[predefined](timezone);
