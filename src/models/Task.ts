import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ITask extends Document {
    _id: string;
    id: string;
    title: string;
    description: string;
}

const TaskSchema: Schema = new Schema({
    _id: { type: String, required: true, unique: true },
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
});

// Ensure that id is set to the same value as _id
TaskSchema.pre('save', function(next) {
    if (!this.id) {
        this.id = this._id;
    }
    next();
});

const Task: Model<ITask> = mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);

export default Task;
