import { postgresSQL } from '../../database/sql/postgres';
import { ConflictError } from '../../errors/ConflictError';
import { DatabaseError } from '../../errors/DatabaseError';

export class VoteModel {
  private readonly table = 'votes';

  async create(pollId: string, userId: string): Promise<void> {
    try {
      await postgresSQL.insert(this.table, 'poll_id, device_id', `'${pollId}', ${userId}`);
    } catch (error) {
      if ((error as { routine: string }).routine === '_bt_check_unique') {
        throw new ConflictError('Vote already exists');
      }
      throw new DatabaseError('Failed to record vote', {
        cause: (error as Error).message,
        hint: 'Check database connection and configuration',
        detail: 'Error occurred while inserting vote into the database',
        pollId,
        userId,
      });
    }
  }
}