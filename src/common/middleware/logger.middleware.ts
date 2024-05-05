import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl, headers } = req;
    console.log(res.statusCode);

    res.on('finish', () => {
      console.log(ip, method, originalUrl, headers, res.statusCode);
    });
    next();
  }
}
