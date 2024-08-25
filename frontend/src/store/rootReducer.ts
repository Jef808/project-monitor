import {combineReducers} from '@reduxjs/toolkit';
import projectsSliceReducer from './projectsSlice';

const rootReducer = combineReducers({
    projects: projectsSliceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
