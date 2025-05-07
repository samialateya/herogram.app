/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction): Response => {
  return res.status(404).end();
};