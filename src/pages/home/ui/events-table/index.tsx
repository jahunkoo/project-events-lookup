'use client';

import { ColumnDef } from '@tanstack/react-table';
import {
  useEventViewModels,
  EventViewModel,
} from '@/pages/home/model/hooks/event-view-models-hook';
import { DataTable } from './data-table';
import { convertProtobufTimestampToDate, formatDate } from '@/shared/util';
import { useEventsFilterStore } from '../../model/store/events-filter-store';

const columns: ColumnDef<EventViewModel>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'createTime',
    header: 'Create Time',
    cell: ({ row }) => {
      const { createTime, timezone } = row.original;

      const date = convertProtobufTimestampToDate(createTime, timezone);
      const dateText = formatDate(date, 'MMM d, yyyy, h:mm a');

      return <div>{dateText}</div>;
    },
  },
];

export const EventsTable = () => {
  const project = useEventsFilterStore((state) => state.project);
  const { eventViewModels, isFetching } = useEventViewModels();

  return (
    <DataTable
      columns={columns}
      data={eventViewModels || []}
      loading={isFetching}
      emptyMessage={project ? `No events found` : 'Please select a project'}
    />
  );
};
