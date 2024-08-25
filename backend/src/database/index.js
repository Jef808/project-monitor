import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const clientOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true
  }
};

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, clientOptions);
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('MongoDB disconnection error:', error);
  }
};

export const setupCloseCallback = (server) => {
  process.on('SIGINT', async () => {
    await disconnectDB();
    server.close(() => {
      process.exit(0);
    })
  });
  process.on('SIGTERM', async () => {
    await disconnectDB();
    server.close(() => {
      process.exit(0);
    });
  });
};

//   process.on('SIGTERM', async () => {
//     await disconnectDB();
//     server.close(() => {
//       console.log('Server closed');
//       process.exit(0);
//     });
//   });
// };
