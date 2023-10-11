import { NextFunction, Request, Response } from 'express';
import { User, UserLoginData } from '../entities/user';
import { Repository } from '../repository/repository';
import { Auth } from '../types/auth';
import { HttpError } from '../types/http-error';
import { TokenPayload } from '../types/token';
import { Controller } from './controller';

export class UserController extends Controller<User> {
  constructor(protected repo: Repository<User>) {
    super(repo);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body as unknown as UserLoginData;
    const error = new HttpError(401, 'Unauthorized', 'Login Unauthorized');
    try {
      if (!this.repo.search) return;

      const data = await this.repo.search({ key: 'email', value: email });

      if (!data.length) {
        throw error;
      }

      const user = data[0];

      if (!(await Auth.comparePasswords(password, user.password))) {
        throw error;
      }

      const payload: TokenPayload = {
        id: user.id,
        email: user.email,
      };

      const token = Auth.signJWT(payload);
      res.json({ user, token });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.password = await Auth.hashPassword(req.body.password);
    } catch (error) {
      next(error);
    }

    super.create(req, res, next);
  }
}
