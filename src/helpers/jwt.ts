import { sign, verify } from 'jsonwebtoken';
import { configManager } from './Config';
import { ACCESS_TOKEN_EXPIRATION } from '../constants';
import { AuthUser } from '../types/request/auth';

class JWTManager {
  createAccessToken(authUser: AuthUser): string {
    const accessTokenSecret = configManager.getJWTConfig().accessTokenSecret;
    const accessToken = sign(authUser, accessTokenSecret, { expiresIn: ACCESS_TOKEN_EXPIRATION });
    return accessToken;
  }

  verifyAccessToken<T>(token: string): T {
    const accessTokenSecret = configManager.getJWTConfig().accessTokenSecret;
    return verify(token, accessTokenSecret) as T;
  }
}

const jwtManager = new JWTManager();
export { jwtManager };