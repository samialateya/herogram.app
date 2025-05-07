import { Router, Request, Response } from 'express';
import anonSchema from './schema.json';
import { formValidator } from '../../../../helpers/FormValidator';
import { AnonRequest } from './types';
import { AnonController } from '../../../../controllers/auth/AnonController';

const router = Router();
const anonController = new AnonController();

router.post('/anon', async (req: Request, res: Response) => {
  // TODO: Add rate limiting for issuing access tokens per deviceId
  formValidator.validate(anonSchema, req.body);

  const requestData: AnonRequest = {
    deviceId: req.body.deviceId,
    userAgent: req.headers['user-agent'] || '',
  };

  const accessToken = await anonController.getAccessToken(requestData);

  res.status(201).json({
    accessToken,
  });
});

export default router;