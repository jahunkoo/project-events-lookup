'use client';
import { useQuery } from '@connectrpc/connect-query';
import { listProjects } from '@buf/alignai_frontend-challenge-datetz.connectrpc_query-es/event/v1/event-EventService_connectquery';

export const useProjectListQuery = () =>
  useQuery(listProjects, undefined, {
    select: (data) => data.projects,
  });
