import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const ip = req.ips.length ? req.ips[0] : req.ip;

    console.log('start middleware');
    console.log(ip);

    // res.on('finish', () => {
    //   console.log('after middleware finished');
    //   console.log(res);
    // });
    next();
  }
}
