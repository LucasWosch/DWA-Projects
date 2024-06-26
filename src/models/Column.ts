import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IColumn extends Document {
    _id: string;
    id: string;
    title: string;
    taskIds: string[];
}

const ColumnSchema: Schema = new Schema({
    _id: { type: String, required: true, unique: true },
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    taskIds: { type: [String], required: true }
});

// Ensure that id is set to the same value as _id
ColumnSchema.pre('save', function(next) {
    if (!this.id) {
        this.id = this._id;
    }
    next();
});

const Column: Model<IColumn> = mongoose.models.Column || mongoose.model<IColumn>('Column', ColumnSchema);

export default Column;
