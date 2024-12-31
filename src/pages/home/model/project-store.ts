import { create } from 'zustand';
import { Project } from '@buf/alignai_frontend-challenge-datetz.bufbuild_es/event/v1/event_pb';

interface ProjectState {
  project?: Project;
  setProject: (project: Project) => void;
}

export const useProjectStore = create<ProjectState>()((set) => ({
  project: undefined,
  setProject: (project) => set({ project }),
}));
