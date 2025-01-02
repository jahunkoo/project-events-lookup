'use client';
import { useQuery } from '@connectrpc/connect-query';
import {
  listProjects,
  listEvents,
} from '@buf/alignai_frontend-challenge-datetz.connectrpc_query-es/event/v1/event-EventService_connectquery';
import { Project } from '@buf/alignai_frontend-challenge-datetz.bufbuild_es/event/v1/event_pb';
import { UTCDate } from '@date-fns/utc';

export const useFetchProjectsQuery = () =>
  useQuery(listProjects, undefined, {
    select: (data) => data.projects,
  });

export const useFetchEventsQuery = ({
  project,
  startDate,
  endDate,
  pageToken,
}: {
  project?: Project;
  startDate?: Date;
  endDate?: Date;
  pageToken?: string;
}) => {
  const filter =
    startDate &&
    endDate &&
    `create_time >= "${new UTCDate(startDate).toISOString()}" AND create_time < "${new UTCDate(endDate).toISOString()}"`;

  return useQuery(
    listEvents,
    {
      projectId: project?.id,
      pageToken,
      filter,
    },
    { enabled: !!project && !!startDate && !!endDate },
  );
};
