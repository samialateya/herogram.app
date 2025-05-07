export abstract class ExposableError extends Error {
  public statusCode = 500;

  public errors: object = {};

  public message = 'Error';

  constructor(message: string, errors: object = {}) {
    super(message);
    this.errors = errors;
    this.message = message;
  }
}