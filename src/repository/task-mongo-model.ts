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
    unique: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 140,
  },
  isCompleted: {
    type: Boolean,
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
