/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { logger } from '../helpers/Logger';
import { ExposableError } from '../errors/ExposableError';

export const errorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction): Response => {
  if (err instanceof ExposableError) {
    return res.status(err.statusCode).end();
  }

  logger.error(err, {
    url: req.url,
    method: req.method,
    headers: req.headers,
    query: req.query,
    body: req.body,
  }, 'run time error');
  return res.status(500).end();
};