'use client';

import { ButtonGroup, Button } from '@/shared/ui';
import { useEventsFilterStore } from '../model/store/events-filter-store';
import { useMemo } from 'react';

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
  const { project, periodType, setPeriodType } = useEventsFilterStore();

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
            onClick={() => {
              setPeriodType(value);
            }}
            className={disabled ? '' : className}>
            {label}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};
