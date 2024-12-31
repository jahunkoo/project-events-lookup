'use client';
import { useQuery } from '@connectrpc/connect-query';
import {
  listProjects,
  listEvents,
} from '@buf/alignai_frontend-challenge-datetz.connectrpc_query-es/event/v1/event-EventService_connectquery';
import { useProjectStore } from '../model/project-store';

export const useFetchProjectListQuery = () =>
  useQuery(listProjects, undefined, {
    select: (data) => data.projects,
  });

export const useFetchEventListQuery = () => {
  const project = useProjectStore((state) => state.project);
  return useQuery(
    listEvents,
    {
      projectId: project?.id,
    },
    { enabled: !!project },
  );
};
