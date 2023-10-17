import createDebug from 'debug';
import { Task } from '../entities/task.js';
import { HttpError } from '../types/http-error.js';
import { Repository } from './repository.js';
import { TaskModel } from './task-mongo-model.js';

const debug = createDebug('TDL10:RepoReviewMongoRepository');

export class TaskMongoRepository implements Repository<Task> {
  constructor() {
    debug('Intstantiated');
  }

  async getAll(): Promise<Task[]> {
    const data = await TaskModel.find().exec();
    return data;
  }

  async getById(id: string): Promise<Task> {
    const data = await TaskModel.findById(id).exec();
    if (!data)
      throw new HttpError(
        404,
        'Not found',
        'Review not found in files system',
        {
          cause: 'Method findById',
        }
      );
    return data;
  }

  async create(newData: Omit<Task, 'id'>): Promise<Task> {
    const newTask = await TaskModel.create(newData);
    return newTask;
  }

  async update(id: string, newData: Partial<Task>): Promise<Task> {
    const updatedTask = await TaskModel.findByIdAndUpdate(id, newData, {
      new: true,
    }).exec();
    if (!updatedTask)
      throw new HttpError(404, 'Not Found', 'Review not found in file system', {
        cause: 'Trying findByIdAndUpdate',
      });
    return updatedTask;
  }

  async delete(id: string): Promise<void> {
    const deletedTask = await TaskModel.findByIdAndDelete(id).exec();
    if (!deletedTask)
      throw new HttpError(404, 'Not Found', 'Review not found in file system', {
        cause: 'Fail to delete',
      });
  }

  async search({
    key,
    value,
  }: {
    key: string;
    value: string;
  }): Promise<Task[]> {
    const data = await TaskModel.find({ [key]: value }).exec();
    return data;
  }
}
