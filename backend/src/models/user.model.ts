import { Schema, model, Document, Types } from 'mongoose';
import { ENUM_USER_ROLE } from '../core/enums';
import { enumToList } from './common/_shared.model';

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phoneNo: { type: String, required: true, unique: true },
  role: { type: String, enum: enumToList(ENUM_USER_ROLE), required: true },
  passwordHash: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId },
  updatedBy: { type: Schema.Types.ObjectId }
}, {
  timestamps: true
});

export interface IUser extends Document {
  name: string;
  email: string;
  phoneNo: string;
  role: ENUM_USER_ROLE;
  passwordHash: string;
  createdBy: Types.ObjectId;
  updatedBy?: Types.ObjectId;
}

export const UserModel = model<IUser>('User', UserSchema);
