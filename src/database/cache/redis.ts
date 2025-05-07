import { configManager } from '../../helpers/Config';
import { Redis } from 'ioredis';

class RedisClient {
  private url: string;

  private client: Redis | null = null;

  constructor() {
    this.url = configManager.getCacheConfig().url;
  }

  private async connect() {
    if (this.client) {
      return;
    }

    const redis = new Redis(this.url);
    return new Promise<void>((resolve, reject) => {
      redis.on('connect', () => {
        this.client = redis;
        resolve();
      });

      redis.on('error', (err) => {
        reject(err);
      });
    });
  }

  async save(key: string, value: string | number, expire?: number) {
    await this.connect();

    if (expire && expire > 0) {
      await this.client?.set(key, value, 'EX', expire);
      return;
    }

    await this.client?.set(key, value);
  }
}

const redisClient = new RedisClient();
export { redisClient };