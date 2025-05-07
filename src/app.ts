import express, { Application, Request, Response } from 'express';
import 'express-async-errors';
import { errorHandlerMiddleware } from './middleware/error-handler';
import { notFoundMiddleware } from './middleware/not-found';
import v1Router from './routes/v1';

const app: Application = express();
app.use(express.json());

// TODO: Add rate limiting middleware for all routes

/* --------------------------------- Routes --------------------------------- */
app.get('/', (req: Request, res: Response) => { res.sendStatus(200); });
app.use('/v1', v1Router);

// TODO: Add websocket support for poll updates

/* ------------------------------- Middleware ------------------------------- */
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

export default app;