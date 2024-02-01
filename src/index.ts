import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import Full_Video_route from './Routes/FetchVideoFromURL/FechVideoFromURL';
import bodyParser from 'body-parser';
import authRoute from './auth/auth';
import mongoose from "mongoose";
import { User } from './Models/userModel';
import DBConnection from './DB/db'
// config
dotenv.config(); // configuring .env file

// constants
const app = express();
const PORT = process.env.PORT || 8000;
const DB: string | undefined = process.env.DB || "error";

 // DB
DBConnection(DB);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Use built-in express.urlencoded middleware
app.use(bodyParser.urlencoded({extended:false}))
// all routes
app.use('/api/v1', Full_Video_route);
app.use('/auth/', authRoute);

// default route
app.get('/', (req: Request, res: Response) => {
  const newUser = new User({
    fullName: 'John Doe',
    userName: 'john_doe123',
    password: ['hashed_password'],
    coursesId: ['course_id_1', 'course_id_2'],
    platformFollowers: 'Platform-Followers',
    profile: 'User profile description',
    social: [
      { svg: 'social_svg_1', name: 'SocialName1', link: 'SocialLink1' },
      { svg: 'social_svg_2', name: 'SocialName2', link: 'SocialLink2' },
    ],
  });
  newUser.save().then(()=>{
    console.log('sucess');
    
  }).catch(err=>console.log(err.message));
  res.json({
    status: res.statusCode,
    message: 'Successfully Connected!',
  });
});

app.listen(PORT, () => {
  
  
  console.log(`Server is running on http://localhost:${PORT}`);
});
