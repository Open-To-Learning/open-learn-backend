import { Request,Response,NextFunction ,Router} from "express";
import { Course } from "../../DB/Models/courseModel";

export default async function fetchTrendingCourses(req:Request,res:Response,next:NextFunction){
    const topCourses = await Course.find().sort({popularity:-1}).limit(10);
    res.json({
        topCourses
    })

}