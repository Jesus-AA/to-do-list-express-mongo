import createDebug from 'debug';
import { Router as createRouter } from 'express';
import { TaskController } from '../controller/task-controller.js';
import { TaskMongoRepository } from '../repository/task-mongo-repository.js';

const debug = createDebug('TDL10:Router: ReviewRouter');
debug('Loaded');

const repo = new TaskMongoRepository();
const taskController = new TaskController(repo);
export const taskRouter = createRouter();

taskRouter.post('/create', taskController.create.bind(taskController));
taskRouter.get('/', taskController.getAll.bind(taskController));
taskRouter.get('/:id', taskController.getById.bind(taskController));
taskRouter.patch('/:id', taskController.update.bind(taskController));
