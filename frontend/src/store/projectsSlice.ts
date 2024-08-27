import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Project} from '../types/Project';

type ProjectsState = {
  projects: Project[];
  loading: boolean;
  error: string | null;
};

const initialState: ProjectsState = {
  projects: [],
  loading: false,
  error: null
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    fetchProjectsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProjectsSuccess: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
      state.loading = false;
    },
    fetchProjectsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createProject: (state, action: PayloadAction<Project>) => {
      state.projects = [
        ...state.projects,
        action.payload
      ];
    },
    deleteProjectById: (state, action: PayloadAction<String>) => {
      const projectIndex = state.projects.findIndex((project) => project._id === action.payload);
      state.projects.splice(projectIndex, 1);
    }
  }
});

export const {
  fetchProjectsStart,
  fetchProjectsSuccess,
  fetchProjectsFailure,
  createProject,
  deleteProjectById
} = projectsSlice.actions;
export default projectsSlice.reducer;
