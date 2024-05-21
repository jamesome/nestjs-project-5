import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const ip = req.ips.length ? req.ips[0] : req.ip;

    console.log('Start LoggerMiddleware');
    console.log('ip :: ' + ip);
    console.log('End LoggerMiddleware\n');

    // res.on('finish', () => {
    //   console.log('after middleware finished');
    //   console.log(res);
    // });
    next();
  }
}
