import { Poll } from '../../domain/entities/poll';
import { PollModel } from '../../domain/models/PollModel';
import { PollRequest } from '../../routes/v1/poll/types';
import { v4 as uuid } from 'uuid';
import { AuthUser } from '../../types/request/auth';
import { VoteModel } from '../../domain/models/VoteModel';
import { NotFoundError } from '../../errors/NotFoundError';

export class PollController {
  async createPoll(pollRequest: PollRequest): Promise<string> {
    const poll: Poll = {
      uuid: uuid(),
      question: pollRequest.question,
      options: pollRequest.options,
      expiresat: pollRequest.expiresAt,
    };

    const pollModel = new PollModel();
    await pollModel.create(poll);
    return poll.uuid as string;
  }

  async getPoll(pollUUID: string): Promise<Poll> {
    const pollModel = new PollModel();
    const poll = await pollModel.getWithVotes(pollUUID);
    if (!poll || !poll.id) {
      throw new NotFoundError('Poll not found');
    }
    return poll;
  }

  async vote(authUser: AuthUser, pollUUID: string): Promise<void> {
    const pollModel = new PollModel();
    const poll = await pollModel.getByUUID(pollUUID);
    if (!poll || !poll.id) {
      throw new NotFoundError('Poll not found');
    }
    const voteModel = new VoteModel();
    await voteModel.create(poll.id, authUser.deviceId);
  }
}