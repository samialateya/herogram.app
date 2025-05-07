import { Poll } from '../../domain/entities/poll';
import { PollModel } from '../../domain/models/poll';
import { PollRequest } from '../../routes/v1/poll/types';
import { AuthUser } from '../../types/request/auth';

export class PollController {
  async createPoll(user: AuthUser, pollRequest: PollRequest): Promise<void> {
    const poll: Poll = {
      question: pollRequest.question,
      options: pollRequest.options,
      expiresAt: pollRequest.expiresAt,
    };

    const pollModel = new PollModel();
    await pollModel.create(poll);
  }
}