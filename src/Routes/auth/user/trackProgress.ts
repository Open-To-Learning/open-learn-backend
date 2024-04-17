import { NextFunction, Request, Response } from "express";
import User from "../../../DB/Models/userModel";
import { Course } from "../../../DB/Models/courseModel";

export default async function trackProgress(req: any, res: Response, next: NextFunction) {
    const userName = req.userName;
    const user = await User.findOne({userName});
    if (!user) {
        res.status(404).json({
            status: 404,
            message: 'User not found',
        });
        return;
    }
    try {
        if(user.enrolled && user.enrolled.length > 0) {
            const enrolledCoursesPromises = user.enrolled.map(async (course: any) => {
                const courseData =  await Course.findById(course.courseId);
                return {
                    title: courseData?.title,
                    author: courseData?.author,
                    enrolledOn: courseData?.uploadDate,
                    progress: course.progress,
                    totalDuration: courseData?.lengthSeconds,
                };
            });
            const enrolledCourses = await Promise.all(enrolledCoursesPromises);
            res.status(200).json(
                {
                    ok: true,
                    courses: enrolledCourses,
                }
            );
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Internal server error',
        });
    }
}