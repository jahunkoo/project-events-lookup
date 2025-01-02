'use client';

import DateRangePicker from 'rsuite/DateRangePicker';
import 'rsuite/DateRangePicker/styles/index.css';

import { PeriodType, useEventsFilterStore } from '../model/store/events-filter-store';
import { TZDate } from '@date-fns/tz';
import { addDays, startOfDay } from 'date-fns';

const convertToPickerDate = (timezonedDate: Date): Date => {
  const [year, month, date] = [
    timezonedDate.getFullYear(),
    timezonedDate.getMonth(),
    timezonedDate.getDate(),
  ];
  return new Date(year, month, date);
};

export const CustomPeriodsPicker = () => {
  const { periodType, periodStart, periodEnd, setCustomPeriods, project } = useEventsFilterStore();

  if (periodType !== PeriodType.Custom) return null;

  return (
    <DateRangePicker
      placement="bottomEnd"
      cleanable={false}
      ranges={[]}
      format="MMM dd, yyyy"
      placeholder="Select Custom Period"
      defaultValue={
        periodStart &&
        periodEnd && [convertToPickerDate(periodStart), convertToPickerDate(periodEnd)]
      }
      onChange={(dates) => {
        if (project && dates) {
          const start = startOfDay(
            new TZDate(
              dates[0].getFullYear(),
              dates[0].getMonth(),
              dates[0].getDate(),
              project.timeZone?.id,
            ),
          );
          const end = startOfDay(
            addDays(
              new TZDate(
                dates[1].getFullYear(),
                dates[1].getMonth(),
                dates[1].getDate(),
                project.timeZone?.id,
              ),
              1,
            ),
          );
          setCustomPeriods(start, end);
        }
      }}
    />
  );
};
