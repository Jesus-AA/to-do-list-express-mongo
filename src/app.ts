import cors from 'cors';
import express, { Request, Response } from 'express';
import morgan from 'morgan';

export const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req: Request, res: Response) => {
  res.write('<h1>To-Do-List-Server</h1>');
  res.end();
});
