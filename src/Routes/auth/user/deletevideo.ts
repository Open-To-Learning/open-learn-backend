import { NextFunction, Request, Response } from "express";
import { User } from "../../../DB/Models/userModel";
import { Course } from "../../../DB/Models/courseModel";


export default async function DeleteVideo(req: Request, res: Response, next: NextFunction) {
  const cookiesData: any = req.params.cookiesData;
  const { userName, courseId } = req.body;

  if (cookiesData.userName !== userName) {
    res.status(400).json({
      status: 400,
      message: 'Cookies name and id name mismatch',
    });
    return;
  }

  try {
    const isCourseValid = await Course.findOne({ _id: courseId });

    if (!isCourseValid) {
      res.status(404).json({
        status: 404,
        message: 'Course not found',
      });
      return;
    }
    console.log('valdiate success');
    

    // Delete the course if it exists
    await Course.findOneAndDelete({ _id: courseId });

    // Remove the courseId from the users coursesIds array
    await User.findOneAndUpdate(
      { userName: userName },
      { $pull: { coursesIds: courseId } },
      { new: true }
    );

    res.status(200).json({
      status: 200,
      message: 'Course deleted successfully',
    });
  } catch (error:any) {
    console.error('Error deleting course:', error.message);
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
}
