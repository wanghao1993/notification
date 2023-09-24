import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ResponseMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res['sendResponse'] = (
      data: any,
      statusCode = 200,
      message = 'success',
    ) => {
      res.status(statusCode).json({
        statusCode,
        message,
        data,
      });
    };
    next();
  }
}
