'use client';
import { useQuery } from '@connectrpc/connect-query';
//import { listProjects } from '@buf/alignai_frontend-challenge-datetz.connectrpc_query-es/event/v1/event-EventService_connectquery';
import { listProjects } from '@buf/alignai_frontend-challenge-datetz.connectrpc_query-es/event/v1/event-EventService_connectquery';

export const HomePage = () => {
  const { data } = useQuery(listProjects);
  console.log(data);
  return <div>Home Page - Empty</div>;
};
