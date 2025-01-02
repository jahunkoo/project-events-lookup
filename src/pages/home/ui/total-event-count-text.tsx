'use client';

import { Text } from '@/shared/ui';
import { useEventsFilterStore } from '../model/store/events-filter-store';

export const TotalEventCountText = () => {
  const { project, totalEventCount } = useEventsFilterStore();

  return (
    <Text typescale="body1" className="">
      {project && `${totalEventCount} events`}
    </Text>
  );
};
