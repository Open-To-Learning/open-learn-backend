import { Schema, Document, model } from 'mongoose';

interface Review {
  stars: number;
  description: string;
}

// Define the Thumbnail interface
interface Thumbnail {
  width: number;
  height: number;
  base64: string;
}

// Define the LectureRef interface
interface LectureRef {
  id: Schema.Types.ObjectId;
  title: string;
  duration: number;
}

// Define the Module interface
interface Module {
  lectures: LectureRef[];
  totalDuration: number;
}

// Define the Course schema
interface CourseDocument extends Document {
  author: string;
  title: string;
  description: string;
  thumbnail: Thumbnail;
  cost: string;
  tags: string[];
  type: string;
  enrolled: number;
  modules: Module[];
  reviews: Review[];
  comments: string;
}

const BigcourseSchema = new Schema<CourseDocument>({
  title: { type: String, required: true },
  description: { type: String, required: false },
  thumbnail: {
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    base64: { type: String, required: true },
  },
  cost: { type: String, default: "0" },
  tags: { type: [String], required: false },
  type: { type: String, required: true },
  enrolled: { type: Number, default: 0 },
  author: { type: String, required: true },
  reviews: [{ type: Schema.Types.Mixed, required: false }],
  modules: [{
    lectures: [{
      id: { type: Schema.Types.ObjectId, ref: 'Lecture' },
      title: { type: String, required: true },
      duration: { type: Number, required: true },
    }],
    totalDuration: { type: Number, default: 0 }
  }],
  comments: [{ type: String, required: false }],
}, { timestamps: true });

const BigCourse = model<CourseDocument>('BigCourse', BigcourseSchema);

export { BigCourse };
