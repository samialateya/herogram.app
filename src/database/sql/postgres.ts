import { Client } from 'pg';
import { configManager } from '../../helpers/Config';

class PostgresSQL {
  private client: Client;

  private connected = false;

  constructor() {
    const config = configManager.getDBConfig();
    this.client = new Client(config);
  }

  async connect() {
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

  async disconnect() {
    if (!this.connected) {
      return;
    }

    await this.client.end();
    this.connected = false;
  }

  async insert(table: string, columns: string, values: string) {
    const query = `INSERT INTO ${table} (${columns}) VALUES (${values})`;
    const result = await this.client.query(query);
    return result;
  }
}

const postgresSQL = new PostgresSQL();
export { postgresSQL };