import { Request, Response } from 'express';
import { HqAuthenticationError, HqSsoService } from './hq-sso.service';

export class HqSsoController {
  constructor(private readonly service: HqSsoService) {}

  exchange = async (
    req: Request<Record<string, never>, unknown, { token?: unknown }>,
    res: Response,
  ): Promise<Response> => {
    const token =
      typeof req.body.token === 'string' ? req.body.token.trim() : '';
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: 'HQ sign-in token is required' });

    try {
      const data = await this.service.exchange(token);
      return res.json({ success: true, data });
    } catch (error) {
      if (error instanceof HqAuthenticationError) {
        return res.status(401).json({ success: false, message: error.message });
      }
      return res
        .status(500)
        .json({ success: false, message: 'Unable to complete HQ sign-in' });
    }
  };

  me = (req: Request, res: Response): Response => {
    const authorization = req.headers.authorization;
    const token = authorization?.startsWith('Bearer ')
      ? authorization.slice(7).trim()
      : '';
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: 'Not authenticated' });

    try {
      const user = this.service.authenticateApplicantToken(token);
      return res.json({ success: true, data: user });
    } catch (error) {
      if (error instanceof HqAuthenticationError) {
        return res.status(401).json({ success: false, message: error.message });
      }
      return res
        .status(500)
        .json({ success: false, message: 'Unable to validate session' });
    }
  };
}
