import { logger } from '../helpers/Logger';

export function unhandledRejectionHandler(reason: Error) {
  logger.error(reason, {}, 'Unhandled Promise Rejection');
}

export function uncaughtExceptionHandler(err: Error) {
  logger.error(err, {}, 'Uncaught Exception');
}