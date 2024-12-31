'use client';
import { useQuery } from '@connectrpc/connect-query';
import {
  listProjects,
  listEvents,
} from '@buf/alignai_frontend-challenge-datetz.connectrpc_query-es/event/v1/event-EventService_connectquery';
import { Project } from '@buf/alignai_frontend-challenge-datetz.bufbuild_es/event/v1/event_pb';

export const useFetchProjectsQuery = () =>
  useQuery(listProjects, undefined, {
    select: (data) => data.projects,
  });

export const useFetchEventsQuery = (project?: Project) => {
  return useQuery(
    listEvents,
    {
      projectId: project?.id,
    },
    { enabled: !!project },
  );
};
