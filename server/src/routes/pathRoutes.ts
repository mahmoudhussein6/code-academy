import { Router } from 'express';
import { getPaths, getPathBySlug } from '../controllers/pathController';
import { optionalAuth } from '../middleware/auth';

const router = Router();

router.get('/', optionalAuth, getPaths);
router.get('/:slug', optionalAuth, getPathBySlug);

export default router;

