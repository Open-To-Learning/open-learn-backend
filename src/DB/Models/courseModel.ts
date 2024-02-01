import mongoose, { Schema, Document } from 'mongoose';

// Define the Review schema
interface Review {
  stars: number;
  description: string;
}


// Define the Course schema
interface CourseDocument extends Document {
  Id: string;
  VideoId: string;
  title: string;
  description: string;
  thumbnail: string;
  length: string;
  paid: boolean;
  tags: string[];
  type: string;
  popularity: string;
  author: string;
  uploadDate: string;
  reviews: Review[];
  comments: string;
}

const courseSchema = new Schema<CourseDocument>({
  Id: { type: String, required: true },
  VideoId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  length: { type: String, required: true },
  paid: { type: Boolean, required: true },
  tags: { type: [String], required: true },
  type: { type: String, required: true },
  popularity: { type: String, required: true },
  author: { type: String, required: true },
  uploadDate: { type: String, required: true },
  reviews: [{ 
    stars: { type: Number, required: true },
    description: { type: String, required: true },
  }],
  comments: { type: String, required: true },
});

const Course = mongoose.model<CourseDocument>('Course', courseSchema);

export {Course };
