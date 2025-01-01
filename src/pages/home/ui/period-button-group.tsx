'use client';

import { ButtonGroup, Button, ButtonProps } from '@/shared/ui';
import { useEventsFilterStore } from '../model/store/events-filter-store';
import { getPredefinedDate } from '@/shared/lib';
import { FC, useEffect, useMemo, useState } from 'react';

const PeriodType = {
  Today: 'today',
  Yesterday: 'yesterday',
  ThisWeek: 'thisWeek',
  Last30Days: 'last30Days',
  Custom: 'custom',
} as const;
type PeriodType = (typeof PeriodType)[keyof typeof PeriodType];

type Item = {
  value: PeriodType;
  label: string;
  active: boolean;
};

export const PeriodButtonGroup = () => {
  const { project, setPeriods } = useEventsFilterStore();
  const [periodType, setPeriodType] = useState<PeriodType>(PeriodType.Last30Days);

  useEffect(() => {
    const unsub = useEventsFilterStore.subscribe(
      (state) => state.project,
      (project) => {
        if (project) {
          // default state of PeriodType is last 30 days.
          setPeriods(
            getPredefinedDate('startOf29DaysAgo', project?.timeZone?.id),
            getPredefinedDate('now', project?.timeZone?.id),
          );
        } else {
          setPeriods(undefined, undefined);
        }
      },
    );

    return () => {
      unsub();
    };
  }, []);

  const btnItems = useMemo<Item[]>(() => {
    const labels = {
      [PeriodType.Today]: 'Today',
      [PeriodType.Yesterday]: 'Yesterday',
      [PeriodType.ThisWeek]: 'This Week',
      [PeriodType.Last30Days]: 'Last 30 Days',
      [PeriodType.Custom]: 'Custom',
    };
    return Object.values(PeriodType).map((v) => ({
      value: v,
      label: labels[v],
      active: v === periodType,
    }));
  }, [periodType]);

  const onClickBtn = (type: PeriodType) => {
    setPeriodType(type);
    switch (type) {
      case PeriodType.Today:
        setPeriods(
          getPredefinedDate('startOfToday', project?.timeZone?.id),
          getPredefinedDate('now', project?.timeZone?.id),
        );
        break;
      case PeriodType.Yesterday:
        setPeriods(
          getPredefinedDate('startOfYesterday', project?.timeZone?.id),
          getPredefinedDate('now', project?.timeZone?.id),
        );
        break;
      case PeriodType.ThisWeek:
        setPeriods(
          getPredefinedDate('startOfCurrentWeek', project?.timeZone?.id),
          getPredefinedDate('now', project?.timeZone?.id),
        );
        break;
      case PeriodType.Last30Days:
        setPeriods(
          getPredefinedDate('startOf29DaysAgo', project?.timeZone?.id),
          getPredefinedDate('now', project?.timeZone?.id),
        );
        break;
      case PeriodType.Custom:
        break;
    }
  };

  return (
    <ButtonGroup>
      {btnItems.map(({ value, label, active }) => {
        const disabled = !project;
        const className = active ? 'text-primary bg-neutral-100' : '';
        return (
          <Button
            key={value}
            size="sm"
            variant="outline"
            disabled={disabled}
            onClick={() => onClickBtn(value)}
            className={disabled ? '' : className}>
            {label}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};
