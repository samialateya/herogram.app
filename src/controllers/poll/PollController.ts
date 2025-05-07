import { Poll } from '../../domain/entities/poll';
import { PollModel } from '../../domain/models/poll';
import { PollRequest } from '../../routes/v1/poll/types';
import { v4 as uuid } from 'uuid';
import { AuthUser } from '../../types/request/auth';
import { VoteModel } from '../../domain/models/vote';
import { NotFoundError } from '../../errors/NotFoundError';

export class PollController {
  async createPoll(pollRequest: PollRequest): Promise<string> {
    const poll: Poll = {
      uuid: uuid(),
      question: pollRequest.question,
      options: pollRequest.options,
      expiresAt: pollRequest.expiresAt,
    };

    const pollModel = new PollModel();
    await pollModel.create(poll);
    return poll.uuid as string;
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