import { Request,Response,NextFunction } from "express";
import { Course } from "../../DB/Models/courseModel";

export default async function fetchTrendingCourses(req:Request,res:Response,next:NextFunction){
    try{

        const topCourses = await Course.find().sort({uploadDate:1});
        res.json({
            ok:true,
            topCourses
        })
    }catch(err:any){
        res.status(500).json({
            ok:false,
            message:err.message,
        })
    }

}