import { Response, NextFunction } from 'express';
import { AuthenticationError } from '../errors/AuthenticationError';
import { jwtManager } from '../helpers/jwt';
import { ContextRequest } from '../types/request/context';
import { AuthUser } from '../types/request/auth';

export const authMiddleware = (req: ContextRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    throw new AuthenticationError('');
  }

  try {
    const authUser = jwtManager.verifyAccessToken<AuthUser>(token);
    req.context = { ...req.context, authUser };
    next();
  } catch (error) {
    throw new AuthenticationError();
  }
};