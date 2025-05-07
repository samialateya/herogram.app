import pino from 'pino';

class Logger {
  private logger: pino.Logger;

  private options: pino.LoggerOptions = {
    formatters: {
      level: (label) => ({
        level: label.toUpperCase(),
      }),
    },
    base: undefined,
    timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
  };

  constructor() {
    this.logger = pino(this.options);
  }

  debug(obj: object, msg?: string) {
    this.logger.debug(obj, msg);
  }

  info(obj: object, msg?: string) {
    this.logger.info(obj, msg);
  }

  warn(obj: object, msg?: string) {
    this.logger.warn(obj, msg);
  }

  error(err: Error, obj: object, msg?: string) {
    this.logger.error({ err, obj }, msg);
  }
}

const logger = new Logger();
export { logger };
