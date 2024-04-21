import { BigCourse } from '../../DB/Models/BigCourseModel/BigCourse';
import { NextFunction, Request, Response } from "express";
import UserModel from '../../DB/Models/userModel';
import { Lecture } from '../../DB/Models/BigCourseModel/Lecture';
import ytdl from 'ytdl-core';
// {
//     author: string;
//     title: string;
//     description: string;
//     thumbnail: Thumbnail;
//     cost: number;
//     tags: string[];
//     type: string;
//     totalenrolled: number;
//     enrolled:mongoose.Types.ObjectId[];
//     modules: Module[];
//     reviews: Review[];
//     comments: string;
//   }
export async function CreateModule(req:any,res:Response,next:NextFunction){
    try{

        const {courseId,title} = req.body;
        const isOwner:any = await UserModel.findOne({userName:req.userName,bigCourseIds:courseId});
        if(!isOwner) {
            res.status(404).send({
                ok:false,
                message:'you are not allowed to make change course',

            })
            return ;
        }
        let flag = true;
        let id:string = crypto.randomUUID();
        if(isOwner.modules) {
            while (flag === true) {
                flag = false;
                isOwner.modules.forEach((module:any)=> {
                    if (id === module.id) {
                        flag = true;
                        id = crypto.randomUUID();
                    }
                })
            }
        }
       
        
    const courseModule =await BigCourse.findByIdAndUpdate(courseId,{modules:{$push:{id,title}}},{new:true});

        res.status(201).send({
            ok:true,
            message:'Module created successfuly ! ',
            courseModule
        })
    }catch(err:any){
        res.status(500).send({
            ok:false,
            message:err.message
        })
    }

}
export async function UpdateVideosInModule(req: any, res: Response, next: NextFunction) {
    try {
        const { courseId, moduleId,lecture_description ,Lecture_title, youtubeVideoId } = req.body;

        // Check if the user is the owner of the course
        const isOwner = await UserModel.findOne({ userName: req.userName, bigCourseIds: courseId });
        if (!isOwner) {
            res.status(404).send({
                ok: false,
                message: 'You are not allowed to make changes to the Module.'
            });
            return;
        }
        /// fech from ytdl
        const info:any = await ytdl.getInfo(youtubeVideoId);
        const { title, description, lengthSeconds, videoId } = info.videoDetails;

    const lecture = new Lecture({
      videoId,
      title:Lecture_title? Lecture_title : title,
      description:lecture_description ? lecture_description: description,
      lengthSeconds,
    });

    const savedLecture =  await lecture.save();

        const updatedModule = await BigCourse.findOneAndUpdate(
            { _id: courseId, "modules.id": moduleId },
            { $push: { "modules.$.lectures": savedLecture._id } },
            { new: true }
        );

        res.status(201).send({
            ok: true,
            message: 'Module updated successfully!',
            updatedModule
        });

    } catch (err: any) {
        res.status(500).send({
            ok: false,
            message: err.message
        });
    }
}
export async function DeleteModule(req: any, res: Response, next: NextFunction) {
    const {bigcourseId ,module_id } = req.body;
    try {
        const isOwner = await UserModel.findOne({ userName: req.userName, bigCourseIds: bigcourseId });
        if (!isOwner) {
            res.status(404).send({
                ok: false,
                message: 'You are not allowed to delete the Module.'
            });
            return;
        }
        await BigCourse.findOneAndUpdate({_id:bigcourseId,modules:module_id},{modules:{$pull:{id:module_id}}});

        res.status(204).send({
            ok: true,
            message: 'Course deleted successfully!'
        });
    } catch (err: any) {
        res.status(500).send({
            ok: false,
            message: err.message
        });
    }
}