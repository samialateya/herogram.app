import { ExposableError } from './ExposableError';

export class BadRequestError extends ExposableError {
  constructor(message: string, error: Error, data: object = {}) {
    super(message, error, data);
    this.name = 'BadRequestError';
    this.statusCode = 204;
  }
}