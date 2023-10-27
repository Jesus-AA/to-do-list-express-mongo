import { Schema, model } from 'mongoose';
import { Task } from '../entities/task';

const taskSchema = new Schema<Task>({
  title: {
    type: String,
    required: true,
    minlength: 4,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

taskSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const TaskModel = model('Task', taskSchema, 'tasks');
