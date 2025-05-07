import { SuppressedError } from './SuppressedError';

export class DatabaseError extends SuppressedError {
  constructor(message: string, payload: object) {
    super(message, payload, 'error');
  }
}