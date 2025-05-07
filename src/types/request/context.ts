import { AuthUser } from './auth';
import { Request } from 'express';

export type Context = {
  authUser: AuthUser;
};

export type ContextRequest = Request & { context?: Context };