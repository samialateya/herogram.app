import { logger } from '../helpers/Logger';

type LogLevel = 'error' | 'warn' | 'info' | 'debug' | 'none';

export abstract class SuppressedError extends Error {
  public statusCode = 500;

  public logLevel: LogLevel = 'error';

  public payload: object = {};

  constructor(message: string, payload?: object, logLevel?: LogLevel) {
    super(message);
    this.payload = payload || {};
    this.logLevel = logLevel || this.logLevel;
    this.log();
  }

  private log() {
    switch (this.logLevel) {
      case 'error':
        logger.error(this, this.payload, this.message);
        break;
      case 'warn':
        logger.warn(this.payload, this.message);
        break;
      case 'info':
        logger.info(this.payload, this.message);
        break;
      case 'debug':
        logger.debug(this.payload, this.message);
        break;
    }
  }
}