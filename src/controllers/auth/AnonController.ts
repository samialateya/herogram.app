import { AuthModel } from '../../domain/models/auth';
import { jwtManager } from '../../helpers/jwt';
import { AnonRequest } from '../../routes/v1/auth/anon/types';
import { v4 as uuid } from 'uuid';

export class AnonController {
  async getAccessToken(anonRequest: AnonRequest): Promise<string> {
    const tokenId = uuid();
    const accessToken = jwtManager.createAccessToken(tokenId, anonRequest);
    
    const authModel = new AuthModel();
    await authModel.saveAccessToken(tokenId, anonRequest);

    return accessToken;
  }
}