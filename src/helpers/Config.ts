import { config } from 'dotenv';
import { DBConfig } from '../types/config/database';
import { JWTConfig } from '../types/config/jwt';
import { CacheConfig } from '../types/config/cache';

config();

/**
 * ConfigManager is responsible for managing and providing access to configuration
 * settings used throughout the application.
 * 
 * It handles configuration for:
 * - Database connection (host, port, user, password, database name)
 * - JWT authentication (access token secret)
 * - Cache system (Redis URL)
 * 
 * The class centralizes access to environment variables and provides default values
 * when environment variables are not defined.
 */
class ConfigManager {
  private dbConfig: DBConfig;

  private jwtConfig: JWTConfig;

  private cacheConfig: CacheConfig;

  constructor() {
    this.dbConfig = {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      user: process.env.DB_USER || '',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'herogram',
    };

    this.jwtConfig = {
      accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || '',
    };

    this.cacheConfig = {
      url: process.env.REDIS_URL || '',
    };
  }

  getDBConfig(): DBConfig {
    return this.dbConfig;
  }

  getJWTConfig(): JWTConfig {
    return this.jwtConfig;
  }

  getCacheConfig(): CacheConfig {
    return this.cacheConfig;
  }
}

const configManager = new ConfigManager();

export { configManager };