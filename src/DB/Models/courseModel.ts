import { Schema, Document, model } from 'mongoose';


// Define the Review schema
interface Review {
  stars: number;
  description: string;
}
interface thumbnail{
  width:number,
  height:number,
  base64:string
}

// Define the Course schema
interface CourseDocument extends Document {
  videoId: string;
  title: string;
  lengthSeconds:string,
  description: string;
  thumbnail: thumbnail;
  paid: boolean;
  cost:string;
  tags: string[];
  type: string;
  popularity: number;
  author: string;
  uploadDate: string;
  reviews: Review[];
  comments: string;
}

const courseSchema = new Schema<CourseDocument>({
  videoId: { type: String, required: true },
  title: { type: String, required: true },
  lengthSeconds:{type:String,require:true},
  description: { type: String, required: false },
  thumbnail: { 
    width:{type:Number,required:true},
    height:{type:Number,required:true},
    base64:{type:String,required:true},

   },
  paid: { type: Boolean, required: true },
  cost:{ type:String , default:"0"},
  tags: { type: [String], required: false },
  type: { type: String, required: false },
  popularity: { type: Number,default:0 },
  author: { type: String, required: true },
  uploadDate: { type: String, required: true },
  reviews: [{
    stars: { type: Number, required: false },
    description: { type: String, required: false },
  }],
  comments: { type: String, required: false },
});

const Course = model<CourseDocument>('Course', courseSchema);

// // Fetch video details and save to MongoDB
// const saveVideoDetails = async (youtubeVideoId: string, res: Response) => {
//   try {
//     const info: videoInfo = await ytdl.getInfo(youtubeVideoId);
//     const { title, description, lengthSeconds, uploadDate, videoId, thumbnails, keywords } = info.videoDetails;
//     const thumbnail = thumbnails[thumbnails.length - 1];

//     const newCourse = new Course({
//       Id: 'someId',
//       VideoId: videoId,
//       title: title,
//       description: description,
//       thumbnail: thumbnail,
//       length: lengthSeconds,
//       paid: false,
//       tags: keywords,
//       type: 'video',
//       popularity: 'high', // Or set according to your business logic
//       author: 'authorName', // Or set according to your business logic
//       uploadDate: uploadDate,
//       reviews: [], // Add reviews later
//       comments: '' // Add comments later
//     });

//     await newCourse.save();
//     res.json(newCourse); // Send response after saving to MongoDB
//   } catch (error: any) {
//     console.error('Error:', error.message);
//     res.status(500).json({ error: error.message });
//   }
// };

export { Course };
