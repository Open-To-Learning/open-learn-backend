import {Router} from "express";
import fetchTrendingCourses from "./trending";
import checkauth from "../../middleware/checkauth";

const videosRouter = Router();


videosRouter.get('/trending',checkauth,fetchTrendingCourses);

export default videosRouter;