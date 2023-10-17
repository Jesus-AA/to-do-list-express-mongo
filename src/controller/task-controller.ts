import createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { Task } from '../entities/task.js';
import { Repository } from '../repository/repository.js';
import { UserMongoRepository } from '../repository/user-mongo-repository.js';
import { Controller } from './controller.js';

const debug = createDebug('TDL10:TaskController');

export class TaskController extends Controller<Task> {
  constructor(protected repo: Repository<Task>) {
    super(repo);
    debug('Instantiated');
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userRepo = new UserMongoRepository();

      const user = await userRepo.getById(req.body.author);

      const finalTask = await this.repo.create(req.body);

      user.tasks.push(finalTask);

      userRepo.update(user.id, user);

      const finalTask2 = await this.repo.getById(finalTask.id);

      res.status(201);
      res.json(finalTask2);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await this.repo.getById(req.params.id);

      const userId = String(task.author);
      debug(userId);
      const userRepo = new UserMongoRepository();
      const user = await userRepo.getById(userId);
      const newTaskArray = user.tasks.filter(
        (task) => String(task) !== req.params.id
      );
      user.tasks = newTaskArray;
      await this.repo.delete(req.params.id);
      userRepo.update(user.id, user);
      res.status(204);
      res.json({});
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedTask = await this.repo.update(req.params.id, req.body);
      res.status(200);
      res.json(updatedTask);
    } catch (error) {
      next(error);
    }
  }
}
