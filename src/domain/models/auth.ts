import { DatabaseError } from '../../errors/DatabaseError';
import { ACCESS_TOKEN_EXPIRATION } from '../../constants';
import { redisClient } from '../../database/cache/redis';
import { AuthUser } from '../../types/request/auth';

export class AuthModel {
  async saveAccessToken(authUser: AuthUser) {
    const cacheKey = `anon:${authUser.tokenId}`;
    const cacheValue = JSON.stringify(authUser);

    try {
      await redisClient.save(cacheKey, cacheValue, ACCESS_TOKEN_EXPIRATION);
    } catch (error) {
      throw new DatabaseError('Failed to save access token', {
        cause: error,
        hint: 'Check Redis connection and configuration',
        detail: 'Error occurred while saving access token to Redis',
      });
    }
  }
}