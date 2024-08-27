import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  Paper
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import {RootState} from '../store/rootReducer';
import {
  fetchProjectsStart,
  fetchProjectsSuccess,
  fetchProjectsFailure,
  deleteProjectById
} from '../store/projectsSlice';
import {makeDeleteProjectRequest} from '../api/projects';
import type {Project} from '../types/Project';

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

  const handleDeleteProjectClick = (
    _: React.MouseEvent<HTMLDivElement, MouseEvent>,
    projectId: string
  ) => {
    const ok = makeDeleteProjectRequest(projectId);
    ok && dispatch(deleteProjectById(projectId));
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
                <Stack direction="row" spacing="2">
                  <IconButton edge="end" aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={(event) => handleDeleteProjectClick(event, project._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              }
              disablePadding
            >
              <ListItemButton
                role={undefined}
                selected={selectedId === project._id}
                onClick={(event) => handleProjectClick(event, project._id)}
                dense
              >
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
