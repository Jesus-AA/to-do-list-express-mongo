/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { Repository } from '../repository/repository';

const debug = createDebug('PF11:RepoUserMongoRepository');
export abstract class Controller<T extends { id: string | number }> {
  constructor(protected repo: Repository<T>) {}

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.repo.getAll();
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.repo.getById(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newItem = await this.repo.create(req.body);

      res.status(201);
      res.json(newItem);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      debug(req.params.id);
      await this.repo.delete(req.params.id);
      res.status(204);
      res.json({});
    } catch (error) {
      res.status(500).json(error);
      next();
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updatedItem = await this.repo.update(id, req.body);
      res.json(updatedItem);
    } catch (error) {
      next(error);
    }
  }
}
