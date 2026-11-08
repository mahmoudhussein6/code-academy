import { Router } from 'express';
import { completeLesson, getProgressSummary } from '../controllers/progressController';
import { optionalAuth } from '../middleware/auth';

const router = Router();

router.post('/complete', optionalAuth, completeLesson);
router.get('/summary', optionalAuth, getProgressSummary);

export default router;

