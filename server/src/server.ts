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
const PORT = process.env.PORT || 5000;

// Security and middleware
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
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

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/paths', pathRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/progress', progressRoutes);

// Global Error Handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    message: 'حدث خطأ غير متوقع في الخادم',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

const startServer = async () => {
  await connectDB();
  await initSeedData();

  app.listen(PORT, () => {
    console.log(`🚀 Code Academy Server running on http://localhost:${PORT}`);
  });
};

startServer();

