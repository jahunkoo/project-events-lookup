import { useProjectStore } from '../store/project-store';
import { useFetchEventsQuery } from '../../api/queries';
import {
  Event,
  Project,
} from '@buf/alignai_frontend-challenge-datetz.bufbuild_es/event/v1/event_pb';
import { useMemo } from 'react';

export interface EventViewModel extends Event {
  timezone: string;
}

export const useEventViewModels = () => {
  const { project } = useProjectStore();
  const { data, isFetching } = useFetchEventsQuery(project);

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
