import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth';
import authRouter from './auth/anon';
import pollRouter from './poll';

const router = Router();

router.use('/auth', authRouter);

router.use('/poll', authMiddleware, pollRouter);

export default router;