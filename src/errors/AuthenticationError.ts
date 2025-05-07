import { ExposableError } from './ExposableError';

export class AuthenticationError extends ExposableError {
  constructor(message = '', errors: object = {}) {
    super(message);
    this.message = message;
    this.statusCode = 403;
    this.errors = errors;
  }
}