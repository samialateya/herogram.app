import { sign } from 'jsonwebtoken';
import { configManager } from './Config';
import { AnonRequest } from '../routes/v1/auth/anon/types';
import { ACCESS_TOKEN_EXPIRATION } from '../constants';

class JWTManager {
  createAccessToken(tokenId: string, anonRequest: AnonRequest): string {
    const accessTokenSecret = configManager.getJWTConfig().accessTokenSecret;
    const accessToken = sign({ tokenId, ...anonRequest }, accessTokenSecret, { expiresIn: ACCESS_TOKEN_EXPIRATION });
    return accessToken;
  }
}

const jwtManager = new JWTManager();
export { jwtManager };