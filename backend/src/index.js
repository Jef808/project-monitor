import express from 'express';
import projectsRoutes from './routes/projectsRoutes.js';
import {connectDB, setupCloseCallback} from './database/index.js';

const PORT = process.env.PORT ?? 5172;

const app = express();

app.use(express.json());
app.use('/projects', projectsRoutes);

connectDB();

const server = app.listen(PORT, () => {
  console.log(`Backend serving http://localhost:${PORT}`);
});

setupCloseCallback(server);
