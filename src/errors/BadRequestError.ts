import { ExposableError } from './ExposableError';

export class BadRequestError extends ExposableError {
  constructor(message: string, errors: object = {}) {
    super(message, errors);
    this.name = 'BadRequestError';
    this.statusCode = 400;
    this.errors = errors;
    this.message = message;
  }
}