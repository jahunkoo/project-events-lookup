import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { Project } from '@buf/alignai_frontend-challenge-datetz.bufbuild_es/event/v1/event_pb';
import { getPredefinedDate } from '@/shared/lib';

export const PeriodType = {
  Today: 'today',
  Yesterday: 'yesterday',
  ThisWeek: 'thisWeek',
  Last30Days: 'last30Days',
  Custom: 'custom',
} as const;
export type PeriodType = (typeof PeriodType)[keyof typeof PeriodType];

interface State {
  project?: Project;
  periodType?: PeriodType;
  periodStart?: Date;
  periodEnd?: Date;
}

interface Action {
  setProject: (project: Project) => void;
  setPeriodType: (periodType: PeriodType) => void;
  setCustomPeriods: (periodStart: Date, periodEnd: Date) => void;
}

const initialState: State = {
  project: undefined,
  periodType: undefined,
  periodStart: undefined,
  periodEnd: undefined,
};

const getPeriodDates = (
  periodType: Exclude<PeriodType, 'custom'>,
  project: Project,
): [Date, Date] => {
  switch (periodType) {
    case PeriodType.Today: // 금일 00시 ~ 현재
      return [
        getPredefinedDate('startOfToday', project?.timeZone?.id),
        getPredefinedDate('now', project?.timeZone?.id),
      ];
    case PeriodType.Yesterday: // 작일 00시 ~ 현재
      return [
        getPredefinedDate('startOfYesterday', project?.timeZone?.id),
        getPredefinedDate('now', project?.timeZone?.id),
      ];
    case PeriodType.ThisWeek: // 금주 월요일 00시 ~ 현재
      return [
        getPredefinedDate('startOfCurrentWeek', project?.timeZone?.id),
        getPredefinedDate('now', project?.timeZone?.id),
      ];
    case PeriodType.Last30Days: // 29일전 00시 ~ 현재
      return [
        getPredefinedDate('startOf29DaysAgo', project?.timeZone?.id),
        getPredefinedDate('now', project?.timeZone?.id),
      ];
  }
};

export const useEventsFilterStore = create<State & Action>()(
  subscribeWithSelector((set, get) => ({
    ...initialState,
    setProject: (project) => {
      if (project) {
        const periodType = PeriodType.Last30Days;
        const periodStart = getPredefinedDate('startOf29DaysAgo', project?.timeZone?.id);
        const periodEnd = getPredefinedDate('now', project?.timeZone?.id);
        set({ project, periodType, periodStart, periodEnd });
      } else {
        set({ ...initialState });
      }
    },
    setPeriodType: (periodType) => {
      if (periodType == PeriodType.Custom) {
        set({ periodType });
      } else {
        const [start, end] = getPeriodDates(periodType, get().project!);
        set({
          periodType,
          periodStart: start,
          periodEnd: end,
        });
      }
    },
    setCustomPeriods: (periodStart, periodEnd) => {
      set({ periodType: PeriodType.Custom, periodStart, periodEnd });
    },
  })),
);
