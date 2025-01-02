import { useEventsFilterStore } from '../store/events-filter-store';
import { useFetchEventsQuery } from '../../api/queries';
import { Event } from '@buf/alignai_frontend-challenge-datetz.bufbuild_es/event/v1/event_pb';
import { useEffect, useMemo } from 'react';

export interface EventViewModel extends Event {
  timezone: string;
}

export const useEventViewModels = () => {
  const {
    project,
    periodStart,
    periodEnd,
    pageNum,
    pageTokenMap,
    setPageToken,
    setTotalEventCount,
  } = useEventsFilterStore();
  const { data, isFetching } = useFetchEventsQuery({
    project,
    startDate: periodStart,
    endDate: periodEnd,
    pageToken: pageTokenMap[pageNum],
  });

  useEffect(() => {
    if (data) {
      setPageToken(pageNum + 1, data.nextPageToken);
      setTotalEventCount(data.totalSize);
    }
  }, [data]);

  const eventViewModels = useMemo(() => {
    if (!data) return;
    return data.events.map((event) => {
      return { ...event, timezone: project?.timeZone?.id } as EventViewModel;
    });
  }, [project, data]);

  return {
    isFetching,
    nextPageToken: data?.nextPageToken,
    totalSize: data?.totalSize,
    eventViewModels,
  };
};
