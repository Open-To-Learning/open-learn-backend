import { Request, Response } from "express";
import UserModel from "../../../DB/Models/userModel";
import { Course } from "../../../DB/Models/courseModel";

async function getCourseDetails(ID: any) {
    try {
        const { title, lengthSeconds, thumbnail, paid, type, popularity, uploadDate }: any = await Course.findById(ID);
        return {
            ok: true,
            courseInfo: {
                id: ID,
                title,
                lengthSeconds,
                thumbnail,
                paid,
                type,
                popularity,
                uploadDate
            }
        };
    } catch (err: any) {
        return {
            ok: false,
            message: err.message
        };
    }
}

export default async function getUserDetails(req: any, res: Response) {
    const currentUser: string = req.userName;
    try {
        const requestedUser = await UserModel.findOne({ userName: req.params.userName });
        if (!requestedUser) {
            return res.status(404).send({
                ok: false,
                message: 'User not found',
            })
        }
        const fetchCourses: any = requestedUser.coursesIds;
        const coursePromises = fetchCourses.map((e: any) => getCourseDetails(e));
        const courses = await Promise.all(coursePromises); // Await all promises here
        
        const owner: boolean = requestedUser.userName === currentUser;

        res.send({
            fullName: requestedUser.fullName,
            userName: requestedUser.userName,
            platformFollowers: requestedUser.platformFollowers? requestedUser.platformFollowers : 0,
            social: requestedUser.social ? requestedUser.social : [],
            profileImage: requestedUser.profileImage,
            courses,
            owner
        })
    } catch (error: any) {
        res.status(500).send({
            ok: false,
            message: 'Server error',
        })
    }
}
