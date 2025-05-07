import { logger } from '../helpers/Logger';

export class ExposableError extends Error {
  public statusCode = 500;

  constructor(message: string, error: Error, data: object = {}) {
    super(message);
    this.name = 'ExposableError';
    logger.error(error, data, message);
  }
}