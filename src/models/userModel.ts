import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    id: string;
    name: string;
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const userModel = mongoose.model<IUser>('User', userSchema);

export default userModel;
