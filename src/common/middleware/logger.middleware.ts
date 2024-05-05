import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // const { ip, method, originalUrl, headers } = req;
    // console.log('start middleware');
    // console.log(req.body);

    // res.on('finish', () => {
    //   console.log('after middleware finished');
    // console.log(res);
    // });
    next();
  }
}
