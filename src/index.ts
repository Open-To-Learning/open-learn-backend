import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import Full_Video_route from './Routes/FetchVideoFromURL/FechVideoFromURL';

// config
dotenv.config(); // configuring .env file

// constants
const PORT = process.env.PORT || 8000;

const app = express();

// middleware
app.use(express.json());
// all routes
app.use('/api/v1',Full_Video_route)

// default route
app.get('/', (req: Request, res: Response) => {
  res.json({
    status: res.statusCode,
    message: 'Successfully Connected!',
  });
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));