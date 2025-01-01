import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { Project } from '@buf/alignai_frontend-challenge-datetz.bufbuild_es/event/v1/event_pb';

interface EventsFilterState {
  project?: Project;
  setProject: (project: Project) => void;
  periodStart?: Date;
  periodEnd?: Date;
  setPeriods: (periodStart?: Date, periodEnd?: Date) => void;
}

export const useEventsFilterStore = create<EventsFilterState>()(
  subscribeWithSelector((set) => ({
    project: undefined,
    setProject: (project) => {
      set({ project, periodStart: undefined, periodEnd: undefined });
    },
    periodStart: undefined,
    periodEnd: undefined,
    setPeriods: (periodStart, periodEnd) => set({ periodStart, periodEnd }),
  })),
);
