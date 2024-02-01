import mongoose, { Schema, Document } from 'mongoose';

// Define the Social schema
interface Social {
  svg: string;
  name: string;
  link: string;
}

// Define the User schema
interface UserDocument extends Document {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  coursesIds: string[];
  platformFollowers: number;
  profileImage: string;
  social: Social[];
}

const userSchema = new Schema<UserDocument>({
  fullName: { type: String, required: true },
  userName: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  coursesIds: { type: [String], required: false },
  platformFollowers: { type: Number, required: false },
  profileImage: { type: String, required: false },
  social: [{
    svg: { type: String, required: false },
    name: { type: String, required: false },
    link: { type: String, required: false },
  }],
});

const User = mongoose.model<UserDocument>('User', userSchema);

export { User };
