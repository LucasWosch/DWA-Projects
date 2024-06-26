import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IColumn extends Document {
    id: string;
    title: string;
    taskIds: string[];
}

const ColumnSchema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    taskIds: { type: [String], required: true },
});

const Column: Model<IColumn> = mongoose.models.Column || mongoose.model<IColumn>('Column', ColumnSchema);

export default Column;
