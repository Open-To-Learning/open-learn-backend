import { Schema, Document, model } from 'mongoose';

interface LectureDocument extends Document {
    videoId: string;
    title: string;
    lengthSeconds: number;
    description: string;
    author: string;
  }
  
  const LectureSchema = new Schema<LectureDocument>({
    videoId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    lengthSeconds: { type: Number, required: true },
  }, { timestamps: true });
  
  const Lecture = model<LectureDocument>('Lecture', LectureSchema);

  export { Lecture};