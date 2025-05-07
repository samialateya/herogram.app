/* eslint-disable no-console */
import app from './app';
import { uncaughtExceptionHandler, unhandledRejectionHandler } from './middleware/process-error-handler';

/* ----------------------------- HTTP Listener ----------------------------- */
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('listening on port ' + port);
});

/* ----------------------------- process controller ---------------------------- */
process
  .on('unhandledRejection', unhandledRejectionHandler)
  .on('uncaughtException', uncaughtExceptionHandler);