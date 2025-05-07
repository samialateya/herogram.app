import { Router, Response } from 'express';
import { formValidator } from '../../../helpers/FormValidator';
import pollSchema from './schema.json';
import { ContextRequest } from '../../../types/request/context';
import { PollController } from '../../../controllers/poll/PollController';
import { PollRequest } from './types';
import { AuthenticationError } from '../../../errors/AuthenticationError';

const router = Router();

const pollController = new PollController();

router.post('/', async (req: ContextRequest, res: Response) => {
  // TODO: Add rate limiting for creating polls per user

  formValidator.validate(pollSchema, req.body);
  const requestData: PollRequest = {
    question: req.body.question,
    options: req.body.options,
    expiresAt: req.body.expiresAt,
  };

  const pollId = await pollController.createPoll(requestData);
  res.status(201).json({ pollId });
});

router.post('/:pollId/vote', async (req: ContextRequest, res: Response) => {
  // TODO: Add rate limiting for voting per user

  const pollId = req.params.pollId;

  if (!req.context?.authUser) {
    throw new AuthenticationError();
  }

  await pollController.vote(req.context.authUser, pollId);
  res.status(200).end();
});

router.get('/:pollId', async (req: ContextRequest, res: Response) => {
  const pollId = req.params.pollId;

  if (!req.context?.authUser) {
    throw new AuthenticationError();
  }

  const poll = await pollController.getPoll(pollId);
  res.status(200).json({
    id: poll.uuid,
    question: poll.question,
    options: poll.options,
    expiresAt: poll.expiresat,
    votes: poll.votes?.length || 0,
  });
});

export default router;