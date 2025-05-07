import { Router } from 'express';
import authRouter from './auth/anon';

const router = Router();

router.use('/auth', authRouter);

export default router;