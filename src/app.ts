import cors from 'cors';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { taskRouter } from './router/task.router.js';
import { userRouter } from './router/user.router.js';

export const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req: Request, res: Response) => {
  res.write('<h1>To-Do-List-Server</h1>');
  res.end();
});

app.use('/users', userRouter);
app.use('/tasks', taskRouter);
