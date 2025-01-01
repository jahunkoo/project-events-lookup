'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useEventViewModels, EventViewModel } from '../../model/hooks/events-view-model-hook';
import { DataTable } from './data-table';
import { convertProtobufTimestampToDate, formatDate } from '@/shared/lib';

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
  // useEventsViewModel
  const { eventViewModels } = useEventViewModels();

  return <DataTable columns={columns} data={eventViewModels || []} />;
};
