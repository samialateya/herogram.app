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
}