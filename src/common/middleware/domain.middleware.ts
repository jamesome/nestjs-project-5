import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class DomainMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const domain = req.params.domain;

    req.domain = domain;

    next();
  }
}
