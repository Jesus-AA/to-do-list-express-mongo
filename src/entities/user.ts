import { Task } from './task';

export type UserLoginData = {
  email: string;
  password: string;
};

export type UserNoId = UserLoginData & {
  firstName: string;
  lastName: string;
  tasks: Task[];
};

export type UserWithId = {
  id: string;
};

export type User = UserNoId & UserWithId;
