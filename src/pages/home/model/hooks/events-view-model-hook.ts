import { useProjectStore } from '../store/project-store';
import { useFetchEventsQuery } from '../../api/queries';
import {
  Event,
  Project,
} from '@buf/alignai_frontend-challenge-datetz.bufbuild_es/event/v1/event_pb';

interface EventsViewModel {
  project?: Project;
  isFetching: boolean;
  events?: Event[];
  nextPageToken?: string;
  totalSize?: number;
}

export const useEventsViewModel = (): EventsViewModel => {
  const { project } = useProjectStore();
  const { data, isFetching } = useFetchEventsQuery(project);

  return {
    project,
    isFetching,
    ...data,
  };
};
