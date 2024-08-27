import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Box, Typography } from '@mui/material';
import { Project } from '../type/project';
import { createProject } from '../store/projectsSlice';

const CreateProjectForm: React.FC = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Project>({
    name: '',
    description: '',
    url: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createProject(formData));
    // Reset form after submission
    setFormData({ name: '', description: '', url: '' });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Create New Project
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Project Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={4}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="URL"
        name="url"
        value={formData.url}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Create Project
      </Button>
    </Box>
  );
};

export default CreateProjectForm;
