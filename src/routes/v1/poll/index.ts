import { Router, Response } from 'express';
import { formValidator } from '../../../helpers/FormValidator';
import pollSchema from './schema.json';
import { ContextRequest } from '../../../types/request/context';
import { PollController } from '../../../controllers/poll/PollController';
import { PollRequest } from './types';
import { AuthenticationError } from '../../../errors/AuthenticationError';

const router = Router();

const pollController = new PollController();

router.get('/', async (req: ContextRequest, res: Response) => {
  formValidator.validate(pollSchema, req.body);
  const requestData: PollRequest = {
    question: req.body.question,
    options: req.body.options,
    expiresAt: req.body.expiresAt,
  };

  if (!req.context?.authUser) {
    throw new AuthenticationError();
  }

  await pollController.createPoll(req.context.authUser, requestData);
  res.status(204).end();
});

export default router;