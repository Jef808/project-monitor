import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import projectsRoutes from './routes/projectsRoutes.js';

dotenv.config();

const PORT = process.env.PORT ?? 5172;

const clientOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true
  }
};

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, clientOptions);
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('MongoDB disconnection error:', error);
  }
};

const app = express();

app.use(express.json());
app.use('/projects', projectsRoutes);

connectDB();

const server = app.listen(PORT, () => {
  console.log(`Backend serving http://localhost:${PORT}`);
});

process.on('SIGINT', async () => {
  console.log('\nSIGINT signal received. Shutting down gracefully.');
  await disconnectDB();
  server.close(() => {
    console.log('Backend server closed');
    process.exit(0);
  });
});

process.on('SIGTERM', async () => {
  console.log('\nSIGTERM signal received. Shutting down gracefully.');
  await disconnectDB();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
