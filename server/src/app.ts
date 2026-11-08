import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';

import { connectDB } from './config/database';
import { initSeedData } from './data/store';

import authRoutes from './routes/authRoutes';
import pathRoutes from './routes/pathRoutes';
import courseRoutes from './routes/courseRoutes';
import lessonRoutes from './routes/lessonRoutes';
import progressRoutes from './routes/progressRoutes';

dotenv.config();

const app = express();

// Allowed frontend origins
const allowedOrigins = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  ...(process.env.CLIENT_URL || '')
    .split(',')
    .map((url) => url.trim())
    .filter(Boolean),
]);

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.has(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health Check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Code Academy API is running smoothly',
    timestamp: new Date().toISOString(),
  });
});

// Initialize MongoDB once per running instance
let initializationPromise: Promise<void> | null = null;

const initializeServices = async () => {
  if (!initializationPromise) {
    initializationPromise = (async () => {
      const connected = await connectDB();

      if (!connected && process.env.NODE_ENV === 'production') {
        throw new Error('MongoDB connection failed');
      }

      if (connected) {
        await initSeedData();
      }
    })().catch((error) => {
      initializationPromise = null;
      throw error;
    });
  }

  await initializationPromise;
};

// Ensure database is ready before API requests
app.use('/api', async (_req, res, next) => {
  try {
    await initializeServices();
    next();
  } catch (error) {
    console.error('Database initialization failed:', error);

    res.status(503).json({
      message: 'Service temporarily unavailable. Please try again.',
    });
  }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/paths', pathRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/progress', progressRoutes);

// Global Error Handler
app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error('Unhandled Server Error:', err);

    res.status(500).json({
      message: 'An unexpected server error occurred.',
      error:
        process.env.NODE_ENV === 'development'
          ? err.message
          : undefined,
    });
  }
);

// CommonJS export for Vercel
export = app;