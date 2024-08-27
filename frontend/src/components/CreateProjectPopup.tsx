import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField
} from '@mui/material';
import {createProject} from '../store/projectsSlice';
import {makeCreateProjectRequest} from '../api/projects';
import type {Project} from '../types/Project';

type CreateProjectPopupProps = {
  open: boolean,
  handleClose: () => void
};

const CreateProjectPopup: React.FC<CreateProjectPopupProps> = ({
  open,
  handleClose
}) => {
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget) as Project;
    const formJson = Object.fromEntries((formData).entries());
    const project = await makeCreateProjectRequest(formJson);
    if (!!project) {
      const {_id, name, description, url, updatedAt} = project;
      dispatch(createProject({_id, name, description, url, updatedAt}));
    }

    handleClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      style={{maxWidth: 400, margin: "auto"}}
      PaperProps={{
        component: "form",
        autoComplete: "off",
        onSubmit: handleSubmit
      }}
    >
      <DialogTitle>Create New Project</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Create a new project manually.
        </DialogContentText>
        <Stack>
          <TextField
            margin="normal"
            id="name"
            name="name"
            label="Project Name"
            autoFocus
            fullWidth
            required
          />
          <TextField
            margin="normal"
            id="description"
            label="Description"
            name="description"
            rows={4}
            fullWidth
            required
          />
          <TextField
            margin="normal"
            id="url"
            label="URL"
            name="url"
            type="url"
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button type="submit">
          Create Project
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateProjectPopup;
