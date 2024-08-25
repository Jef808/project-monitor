import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Project} from '../types/Project';

type ProjectsState = {
    projects: Project[];
    loading: boolean;
    error: string | null;
};

const initialState: ProjectsState = {
    projects: [
        {
            id: 0,
            name: 'ellm',
            description: 'this is a test project',
            gitUrl: 'https://github.com/Jef808/ellm',
            createdAt: '2024-08-23',
            updatedAt: '2024-08-23'
        },
        {
            id: 1,
            name: 'echo-crafter',
            description: 'this is a second test project',
            gitUrl: 'https://github.com/Jef808/echocrafter',
            createdAt: '2024-08-24',
            updatedAt: '2024-08-24'
        }
    ],
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
        }
    }
});

export const {
    fetchProjectsStart,
    fetchProjectsSuccess,
    fetchProjectsFailure
} = projectsSlice.actions;
export default projectsSlice.reducer;
