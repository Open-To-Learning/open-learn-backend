import mongoose, { Schema, Document } from 'mongoose';

// Define the Social schema
interface Social {
  svg: string;
  name: string;
  link: string;
}

// Define the Notification Preferences schema
interface NotificationPreferences {
  email: boolean;
  sms: boolean;
}

// Define the User schema
interface UserDocument extends Document {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  coursesIds?: Schema.Types.ObjectId[];
  enrolled?: Schema.Types.ObjectId[];
  platformFollowers?: number;
  profileImage?: string;
  social?: Social[];
  address?: string;
  phoneNumber?: string;
  paymentMethods?: string[];
  paymentHistory?: mongoose.Types.ObjectId[];
  accountBalance: number;
  accountStatus: 'active' | 'inactive' | 'banned';
  createdAt: Date;
  lastLoginAt?: Date;
  notificationPreferences: NotificationPreferences;
  roles?: string[];
}

const userSchema = new Schema<UserDocument>({
  fullName: { type: String, required: true },
  userName: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  coursesIds: { type: [Schema.Types.ObjectId] ,ref:'Course' },
  enrolled:{ type: [Schema.Types.ObjectId] ,ref:'Course' },
  platformFollowers: { type: Number },
  profileImage: { type: String },
  social: [{
    svg: { type: String },
    name: { type: String },
    link: { type: String },
  }],
  address: { type: String },
  phoneNumber: { type: String },
  paymentMethods: [{ type: String }],
  paymentHistory: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
  accountBalance: { type: Number, default: 0 },
  accountStatus: { type: String, enum: ['active', 'inactive', 'banned'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
  lastLoginAt: { type: Date },
  notificationPreferences: {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: false },
  },
  roles: [{ type: String }],
});

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;