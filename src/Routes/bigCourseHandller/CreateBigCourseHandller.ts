import { BigCourse } from '../../DB/Models/BigCourseModel/BigCourse';
// import { Lecture } from '../../DB/Models/BigCourseModel/Lecture';

import { NextFunction, Request, Response } from "express";
import UserModel from '../../DB/Models/userModel';
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
export async function CreateBigCourse(req:any,res:Response,next:NextFunction){
    try{

        const {title,description,thumbnail,cost,tags,type} = req.body;

        const newCourse = new BigCourse({
            author:req.userName,
            title,description,
            thumbnail:{base64:thumbnail},
            cost,tags,type
        });
        const savedCourse :any = await newCourse.save();
        const updateUser  =await  UserModel.findByIdAndUpdate(req.userId,{$push:{bigCourseIds:savedCourse._id}},{new:true});
        
        res.send({
            ok:true,
            message:"new course created",
            details:{...(savedCourse._doc)}
        });

    }catch(err:any){
        res.status(500).send({
            ok:false,
            message:err.message
        })
    }

}
export async function UpdateBigCourse(req:any,res:Response,next:NextFunction){
    const {id,title,description,thumbnail,cost,tags,type} = req.body;
    try{
        const isOwner = await UserModel.findOne({userName:req.userName,bigCourseIds:id});
        if(!isOwner) {
            res.status(404).send({
                ok:false,
                message:'you are not allowed to make change course',

            })
            return ;
        }

        const newCourse:any = await BigCourse.findByIdAndUpdate(id,{
            author:req.userName,
            title,description,
            thumbnail:{base64:thumbnail},
            cost,tags,type
        },{new:true});
        res.send({
            ok:true,
            message:'course updated successfuly !',
            details:{...newCourse._doc}
        })
        
    }catch(err:any){
        res.status(500).send({
            ok:false,
            message:err.message
        })
    }

}
export async function DeleteBigCourse(req: any, res: Response, next: NextFunction) {
    const { id } = req.body;
    try {
        const isOwner = await UserModel.findOne({ userName: req.userName, bigCourseIds: id });
        if (!isOwner) {
            res.status(404).send({
                ok: false,
                message: 'You are not allowed to delete the course.'
            });
            return;
        }
        await BigCourse.findByIdAndDelete(id);
        await UserModel.findByIdAndUpdate(req.id,{$pull:{bigCourseIds:id}});

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

