import { Request, Response } from 'express';
import { HqSsoService } from './hq-sso.service';
export declare class HqSsoController {
    private readonly service;
    constructor(service: HqSsoService);
    exchange: (req: Request<Record<string, never>, unknown, {
        token?: unknown;
    }>, res: Response) => Promise<Response>;
    me: (req: Request, res: Response) => Response;
}
