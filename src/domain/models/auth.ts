import { DatabaseError } from '../../errors/DatabaseError';
import { ACCESS_TOKEN_EXPIRATION } from '../../constants';
import { redisClient } from '../../database/cache/redis';
import { AnonRequest } from '../../routes/v1/auth/anon/types';

export class AuthModel {
  async saveAccessToken(tokenId: string, anonRequest: AnonRequest) {
    const cacheKey = `anon:${tokenId}`;
    const cacheValue = JSON.stringify({
      deviceId: anonRequest.deviceId,
      userAgent: anonRequest.userAgent,
      tokenId,
    });

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