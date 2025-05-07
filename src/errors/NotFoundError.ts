import { ExposableError } from './ExposableError';

export class NotFoundError extends ExposableError {
  constructor(message: string, errors: object = {}) {
    super(message, errors);
    this.name = 'NotFoundError';
    this.statusCode = 404;
    this.errors = errors;
    this.message = message;
  }
}