import { Router } from 'express';
import { getLessons, getLessonBySlug } from '../controllers/lessonController';
import { optionalAuth } from '../middleware/auth';

const router = Router();

router.get('/', optionalAuth, getLessons);
router.get('/:slug', optionalAuth, getLessonBySlug);

export default router;
