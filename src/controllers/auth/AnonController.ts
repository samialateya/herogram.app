import { AuthModel } from '../../domain/models/Auth.js';
import { jwtManager } from '../../helpers/jwt';
import { AnonRequest } from '../../routes/v1/auth/anon/types';
import { v4 as uuid } from 'uuid';

export class AnonController {
  async getAccessToken(anonRequest: AnonRequest): Promise<string> {
    const authUser = {
      tokenId: uuid(),
      deviceId: anonRequest.deviceId,
      userAgent: anonRequest.userAgent,
    };

    const accessToken = jwtManager.createAccessToken(authUser);

    const authModel = new AuthModel();
    await authModel.saveAccessToken(authUser);

    return accessToken;
  }
}