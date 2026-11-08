import { Router } from 'express';
import { getCourses, getCourseBySlug } from '../controllers/courseController';
import { optionalAuth } from '../middleware/auth';

const router = Router();

router.get('/', optionalAuth, getCourses);
router.get('/:slug', optionalAuth, getCourseBySlug);

export default router;
