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
  password: string[];
  coursesId: string[];
  platformFollowers: string;
  profile: string;
  social: Social[];
}

const userSchema = new Schema<UserDocument>({
  fullName: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: [String], required: true },
  coursesId: { type: [String], required: true },
  platformFollowers: { type: String, required: true },
  profile: { type: String, required: true },
  social: [{ 
    svg: { type: String, required: true },
    name: { type: String, required: true },
    link: { type: String, required: true },
  }],
});


const User = mongoose.model<UserDocument>('User', userSchema);


export { User };
