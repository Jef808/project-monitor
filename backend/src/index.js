import cors from 'cors';
import express from 'express';
import projectsRoutes from './routes/projectsRoutes.js';
import {connectDB, setupCloseCallback} from './database/index.js';

const PORT = process.env.PROJECT_MONITOR_API_PORT ?? 3030;

const app = express();

app.use(express.json())
   .use(cors())
   .use('/projects', projectsRoutes);

connectDB();

const server = app.listen(PORT, () => {
  console.log(`Backend serving http://localhost:${PORT}`);
});

setupCloseCallback(server);
