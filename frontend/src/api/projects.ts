import type {Project} from '../types/Project';
import {PROJECT_MONITOR_API_PORT as PORT} from '../config';

const baseUrl = `http://localhost:${PORT}/projects`;

export const makeCreateProjectRequest = async (project: Project) => {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(`Error creating project: ${data.message}`, project);
      return;
    }
    console.log('Project created successfully', data);
    return data;

  } catch (error) {
    console.error('Unhandled error', error);
  }
};

export const makeDeleteProjectRequest = async (projectId: string) => {
  const url = `${baseUrl}/${projectId}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    console.log('Project deleted successfully', projectId);
    return response.ok;

  } catch (error) {
    console.error('Error deleting project:', error);
  }
};
