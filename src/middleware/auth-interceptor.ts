import { NextFunction, Request, Response } from 'express';
import { Auth } from '../types/auth';
import { HttpError } from '../types/http-error';

export class AuthInterceptor {
  authorization = (req: Request, _res: Response, next: NextFunction) => {
    try {
      const token = req.get('Authorization')?.split(' ')[1];
      if (!token) {
        throw new HttpError(498, 'Invalid Token');
      }

      const { id } = Auth.verifyJWTGettingPayload(token);
      req.body.validatedId = id;
      next();
    } catch (error) {
      next(error);
    }
  };
}
