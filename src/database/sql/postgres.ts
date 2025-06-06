import { Client } from 'pg';
import { configManager } from '../../helpers/Config';

export type QueryOptions = {
  table: string;
  columns: string;
  where?: string;
  orderBy?: string;
  limit?: string;
};

/**
 * PostgresSQL class for managing Postgres database connections and operations.
 * 
 * This class provides a simplified interface for common database operations
 * such as inserting data and running queries against a PostgreSQL database.
 * It manages connection state internally and automatically connects when needed.
 * 
 * @class PostgresSQL
 * @example
 * const postgres = new PostgresSQL();
 * const users = await postgres.query<User>({
 *   table: 'users',
 *   columns: '*',
 *   where: 'WHERE active = true'
 * });
 */
class PostgresSQL {
  private client: Client;

  private connected = false;

  constructor() {
    const config = configManager.getDBConfig();
    this.client = new Client(config);
  }

  private async connect() {
    if (this.connected) {
      return;
    }

    try {
      await this.client.connect();
      this.connected = true;
    } catch (error) {
      this.connected = false;
      throw error;
    }
  }

  async insert(table: string, columns: string, values: string) {
    await this.connect();
    const query = `INSERT INTO ${table} (${columns}) VALUES (${values})`;
    const result = await this.client.query(query);
    return result;
  }

  async query<T>(options: QueryOptions): Promise<T[]> {
    await this.connect();
    const query = `SELECT ${options.columns} FROM ${options.table} ${options.where ?? ''} ${options.orderBy ?? ''} ${options.limit ?? ''}`;
    const result = await this.client.query(query);
    return result.rows;
  }

  async customQueryFetcher<T>(query: string): Promise<T[]> {
    await this.connect();
    const result = await this.client.query(query);
    return result.rows;
  }
}

const postgresSQL = new PostgresSQL();
export { postgresSQL };