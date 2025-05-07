import { ExposableError } from './ExposableError';

export class ConflictError extends ExposableError {
  constructor(message = '', errors: object = {}) {
    super(message);
    this.message = message;
    this.statusCode = 406;
    this.errors = errors;
  }
}