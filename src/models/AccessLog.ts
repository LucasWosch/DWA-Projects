import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IAccessLog extends Document {
    email: string;
    accessTime: Date;
}

const AccessLogSchema: Schema = new Schema({
    email: { type: String, required: true },
    accessTime: { type: Date, required: true, default: Date.now }
});

const AccessLog: Model<IAccessLog> = mongoose.models.AccessLog || mongoose.model<IAccessLog>('AccessLog', AccessLogSchema);

export default AccessLog;
