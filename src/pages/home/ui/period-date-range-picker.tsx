import DateRangePicker from 'rsuite/DateRangePicker';
import 'rsuite/DateRangePicker/styles/index.css';

import { useEventsFilterStore } from '../model/store/events-filter-store';
import { TZDate } from '@date-fns/tz';
import { addDays, startOfDay } from 'date-fns';

export const PeriodDateRangePicker = () => {
  const { periodStart, periodEnd, setCustomPeriods, project } = useEventsFilterStore();
  return (
    <DateRangePicker
      placement="bottomEnd"
      cleanable={false}
      ranges={[]}
      format="MMM dd, yyyy"
      defaultValue={periodStart && periodEnd && [periodStart, periodEnd]}
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
        console.log(dates);
      }}
    />
  );
};
