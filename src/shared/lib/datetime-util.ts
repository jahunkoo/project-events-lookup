//import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';
import { TZDate } from '@date-fns/tz';
import { format } from 'date-fns';
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
