import {Router} from "express";
import fetchTrendingCourses from "./trending";

const videosRouter = Router();


videosRouter.get('/trending',fetchTrendingCourses);

export default videosRouter;