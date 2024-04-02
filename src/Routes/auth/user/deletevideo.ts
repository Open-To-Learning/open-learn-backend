import { NextFunction, Request, Response } from "express";
import User from "../../../DB/Models/userModel";
import { Course } from "../../../DB/Models/courseModel";

export default async function DeleteVideo(req: Request, res: Response, next: NextFunction) {
  try {
    const cookiesData: any = req.params.cookiesData;
    const { userName, courseId } = req.body;

    console.log('Received request to delete course with ID:', courseId);

    if (cookiesData.userName !== userName) {
      console.log('Cookies name and id name mismatch');
      res.status(400).json({
        status: 400,
        message: 'Cookies name and id name mismatch',
      });
      return;
    }

    const isCourseValid = await Course.findOne({ _id: courseId });
    if (!isCourseValid) {
      console.log('Course not found with ID:', courseId);
      res.status(404).json({
        status: 404,
        message: 'Course not found',
      });
      return;
    }

    console.log('Course validation successful');
    
    // Delete the course if it exists
    await Course.findOneAndDelete({ _id: courseId });

    // Remove the courseId from the users coursesIds array
    await User.findOneAndUpdate(
      { userName: userName },
      { $pull: { coursesIds: courseId } },
      { new: true }
    );

    console.log('Course deleted successfully');

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
