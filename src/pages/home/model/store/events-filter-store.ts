import { create, StateCreator } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import type {} from '@redux-devtools/extension'; // required for devtools typing
import { Project } from '@buf/alignai_frontend-challenge-datetz.bufbuild_es/event/v1/event_pb';
import { getPredefinedDate } from '@/shared/util';

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
  totalEventCount: number;
  pageNum: number;
  pageTokenMap: Record<number, string>;
}

interface Action {
  setProject: (project: Project) => void;
  setPeriodType: (periodType: PeriodType) => void;
  setCustomPeriods: (periodStart: Date, periodEnd: Date) => void;
  setTotalEventCount: (totalEventCount: number) => void;
  setPageToken: (pageNum: number, pageToken: string) => void;
  nextPage: () => void;
  prevPage: () => void;
}
const initialPaginationState = {
  pageNum: 1,
  totalEventCount: 0,
  pageTokenMap: {},
};
const initialState: State = {
  project: undefined,
  periodType: undefined,
  periodStart: undefined,
  periodEnd: undefined,
  ...initialPaginationState,
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
    case PeriodType.Yesterday: // 작일 00시 ~ 금일 00시
      return [
        getPredefinedDate('startOfYesterday', project?.timeZone?.id),
        getPredefinedDate('startOfToday', project?.timeZone?.id),
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

const middlewares = (f: StateCreator<State & Action>) => devtools(subscribeWithSelector(f));

export const useEventsFilterStore = create<State & Action>()(
  middlewares((set, get) => ({
    ...initialState,
    setProject: (project) => {
      if (project) {
        const periodType = PeriodType.Last30Days;
        const periodStart = getPredefinedDate('startOf29DaysAgo', project?.timeZone?.id);
        const periodEnd = getPredefinedDate('now', project?.timeZone?.id);
        set({ project, periodType, periodStart, periodEnd, ...initialPaginationState });
      } else {
        set(initialState);
      }
    },
    setPeriodType: (periodType) => {
      if (periodType === PeriodType.Custom) {
        set({ periodType });
      } else {
        const [start, end] = getPeriodDates(periodType, get().project!);
        set({
          periodType,
          periodStart: start,
          periodEnd: end,
          ...initialPaginationState,
        });
      }
    },
    setCustomPeriods: (periodStart, periodEnd) => {
      set({ periodType: PeriodType.Custom, periodStart, periodEnd, ...initialPaginationState });
    },
    setTotalEventCount: (totalEventCount) => set({ totalEventCount }),
    nextPage: () => set((state) => ({ pageNum: state.pageNum + 1 })),
    prevPage: () => set((state) => ({ pageNum: state.pageNum - 1 })),
    setPageToken: (pageNum, pageToken) => {
      set((state) => {
        const pageTokenMap = { ...state.pageTokenMap, [pageNum]: pageToken };
        return { pageTokenMap };
      });
    },
  })),
);
