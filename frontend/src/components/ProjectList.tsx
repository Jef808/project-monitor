import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ToolBar,
    Typography,
    Paper
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    Menu as MenuIcon
} from '@mui/icons-material';
import {RootState} from '../store/rootReducer';
import {
    fetchProjectsStart,
    fetchProjectsSuccess,
    fetchProjectsFailure
} from '../store/projectsSlice';
import {Project} from '../types/Project';

const ProjectList: React.FC = () => {
    const [selectedId, setSelectedId] = useState(null as string | null);
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

    const handleProjectClick = (
        _: React.MouseEvent<HTMLDivElement, MouseEvent>,
        projectId: string
    ) => {
        setSelectedId(projectId);
    }

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
                    <React.Fragment key={project._id}>
                    {index > 0 && <Divider component="li" />}
                    <ListItem
                        secondaryAction={
                            <>
                              <IconButton edge="end" aria-label="edit">
                                <EditIcon />
                              </IconButton>
                              <IconButton edge="end" aria-label="delete">
                                <DeleteIcon />
                              </IconButton>
                            </>
                        }
                        disablePadding
                    >
                        <ListItemButton
                            role={undefined}
                            selected={selectedId === project._id}
                            onClick={(event) => handleProjectClick(event, project._id)}
                            dense>
                            <ListItemText
                                primary={project.name}
                                secondary={`Last Updated: ${new Date(project.updatedAt).toLocaleDateString()}`} />
                            {/* <ListItemText
                                primary={""}
                                secondary={project.description} /> */}
                        </ListItemButton>
                    </ListItem>
                    </React.Fragment>
                ))}
            </List>
        </Paper>
    );
};

export default ProjectList
