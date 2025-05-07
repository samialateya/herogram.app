import { postgresSQL } from '../../database/sql/postgres';
import { DatabaseError } from '../../errors/DatabaseError';
import { Poll } from '../entities/poll';

export class PollModel {
  private readonly table = 'polls';

  async create(poll: Poll): Promise<void> {
    try {
      await postgresSQL.insert(this.table,
        'question, options, expiresAt',
        `'${poll.question}', '{${poll.options.join(',')}}', '${poll.expiresAt}'`,
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
        columns: 'id',
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
}