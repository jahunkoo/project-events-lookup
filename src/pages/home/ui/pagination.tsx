'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEventsFilterStore } from '../model/store/events-filter-store';
import { Button } from '@/shared/ui';
import { useMemo } from 'react';

const PAGE_SIZE = 15;

export const Pagination = () => {
  const { totalEventCount, pageNum, pageTokenMap, prevPage, nextPage } = useEventsFilterStore();

  const maxPageNum = useMemo(() => {
    if (!totalEventCount) return 0;
    return Math.ceil(totalEventCount / PAGE_SIZE);
  }, [totalEventCount]);
  console.log(maxPageNum, pageTokenMap);

  const currentPageText = useMemo(() => {
    if (!totalEventCount) return '';
    return `${(pageNum - 1) * PAGE_SIZE + 1} - ${Math.min(
      pageNum * PAGE_SIZE,
      totalEventCount,
    )} of ${totalEventCount}`;
  }, [pageNum, totalEventCount]);

  if (!totalEventCount) return null;
  if (totalEventCount <= PAGE_SIZE) return null;

  return (
    <div className="flex items-center gap-2">
      {`${currentPageText}`}
      <Button
        size="sm"
        variant="ghost"
        className="size-10"
        disabled={pageNum === 1}
        onClick={prevPage}>
        <ChevronLeft />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="size-10"
        disabled={pageNum === maxPageNum}
        onClick={nextPage}>
        <ChevronRight />
      </Button>
    </div>
  );
};
