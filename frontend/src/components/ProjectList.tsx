import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    Divider,
    List,
    ListItemButton,
    ListItemText,
    Typography,
    Paper
} from '@mui/material';
import axios from 'axios';
import {RootState} from '../store/rootReducer';
import {
    fetchProjectsStart,
    fetchProjectsSuccess,
    fetchProjectsFailure
} from '../store/projectsSlice';
import {Project} from '../types/Project';

const ProjectList: React.FC = () => {
    const dispatch = useDispatch();
    const {projects, loading, error} = useSelector((state: RootState) => state.projects);

    useEffect(() => {
        const fetchProjects = async () => {
            dispatch(fetchProjectsStart());
            try {
                const response = await fetch('http://localhost:3030/projects/');
                const data: Project[] = await response.json();
                dispatch(fetchProjectsSuccess(data));
            } catch (err: unknown) {
                if (err instanceof Error) {
                    dispatch(fetchProjectsFailure(err.message));
                } else {
                    dispatch(fetchProjectsFailure('An unknown error occured'));
                }
            }
        };
        fetchProjects();
    }, [dispatch]);

    if (loading) {
        return <Typography>Loading projects...</Typography>;
    }

    if (error) {
        return <Typography color="error">Error: {error}</Typography>;
    }

    return (
        <Paper elevation={3}>
            <List>
                {projects.map((project, index) => (
                    <>
                        {index > 0 && <Divider />}
                        <ListItemButton key={project._id}>
                            <ListItemText
                                primary={project.name}
                                secondary={`Description: ${project.description}`}
                                secondary={`Last Updated: ${new Date(project.updatedAt).toLocaleDateString()}`} />
                        </ListItemButton>
                    </>
                ))}
            </List>
        </Paper>
    );
};

export default ProjectList;
