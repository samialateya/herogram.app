import { SuppressedError } from './SuppressedError';

export class ServerError extends SuppressedError {
  constructor(message: string, payload: object) {
    super(message, payload, 'error');
  }
}