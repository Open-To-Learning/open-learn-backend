import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import Full_Video_route from './Routes/FetchVideoFromURL/FechVideoFromURL';
import bodyParser from 'body-parser';
import authRoute from './Routes/auth/auth';
import DBConnection from './DB/db'
import cookieParser from 'cookie-parser';
import videosRouter from './Routes/videos/videosRoute';
import cors from 'cors';
// config
dotenv.config(); // configuring .env file

// constants
const app = express();
const PORT = process.env.PORT || 8000;
const DB: string | undefined = process.env.DB || "error";
// exports
export const SECRET_TOKEN: string | undefined = process.env.USER_SECRET;

// DB
DBConnection(DB);

// middleware
app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Use built-in express.urlencoded middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser());

// all routes
app.use('/api/v1', Full_Video_route);
app.use('/auth/', authRoute);
app.use('/videos',videosRouter);

// default route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    staus:200,
    message:"server Found!"
  })
});

app.listen(PORT, () => {
  
  
  console.log(`Server is running on http://localhost:${PORT}`);
});
