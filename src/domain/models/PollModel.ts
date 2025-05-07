import { postgresSQL } from '../../database/sql/postgres';
import { DatabaseError } from '../../errors/DatabaseError';
import { Poll } from '../entities/poll';
import { Vote } from '../entities/vote';

export class PollModel {
  private readonly table = 'polls';

  async create(poll: Poll): Promise<void> {
    try {
      await postgresSQL.insert(this.table,
        'uuid, question, options, expiresat',
        `'${poll.uuid}', '${poll.question}', '{${poll.options.join(',')}}', '${poll.expiresat}'`,
      );
    } catch (error) {
      throw new DatabaseError('Failed to create poll', {
        cause: (error as Error).message,
        hint: 'Check database connection and configuration',
        detail: 'Error occurred while inserting poll into the database',
        poll,
      });
    }
  }

  async getByUUID(pollUUID: string): Promise<Poll | null> {
    try {
      const poll = await postgresSQL.query<Poll>({
        table: this.table,
        columns: '*',
        where: `WHERE uuid = '${pollUUID}'`,
        limit: 'LIMIT 1',
      });
      if (poll.length === 0) {
        return null;
      }
      return poll[0];
    } catch (error) {
      if ((error as Error).message.includes('invalid input syntax for type uuid')) {
        return null;
      }
      throw new DatabaseError('Failed to get poll', {
        cause: (error as Error).message,
        hint: 'Check database connection and configuration',
        detail: 'Error occurred while querying poll from the database',
        pollUUID,
      });
    }
  }

  async getWithVotes(pollUUID: string): Promise<Poll | null> {
    try {
      const polls = await postgresSQL.customQueryFetcher<Poll & { device_id: string, vote_id: string }>(`
        SELECT p.*, v.device_id, v.uuid AS vote_id
        FROM ${this.table} p
        LEFT JOIN votes v ON p.id = v.poll_id
        WHERE p.uuid = '${pollUUID}'
      `);
      if (polls.length === 0) {
        return null;
      }
      polls[0].votes = [];
      polls.forEach((poll) => {
        if (poll.device_id) {
          polls[0].votes?.push({
            userId: poll.device_id,
            pollId: poll.id,
            uuid: poll.vote_id,
          } as Vote);
        }
      });
      return polls[0];
    } catch (error) {
      if ((error as Error).message.includes('invalid input syntax for type uuid')) {
        return null;
      }
      throw new DatabaseError('Failed to get poll with votes', {
        cause: (error as Error).message,
        hint: 'Check database connection and configuration',
        detail: 'Error occurred while querying poll with votes from the database',
        pollUUID,
      });
    }
  }
}