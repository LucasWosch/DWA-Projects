// src/models/Task.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

interface ITask extends Document {
  id: string;
  title: string;
  description: string
}

const TaskSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
});

const Task: Model<ITask> = mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);

export default Task;
