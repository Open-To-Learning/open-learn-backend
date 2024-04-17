import { Request, Response } from "express";
import UserModel from "../../../DB/Models/userModel";


export default async function EnrollInVideo(req: any, res: Response) {
    const userName: string = req.userName;
    try {
        const { videoId } = req.params;
        console.log(videoId);
        // Find the user by username
        const user:any = await UserModel.findOne({ userName });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Enroll the user in the course
        user?.enrolled.push({ courseId: videoId, progress: 0 });
        console.log(user.enrolled);
        
        await user.save();

        res.json({ok:true, message: 'User enrolled in the course successfully' });
    } catch (error) {
        console.error('Error enrolling user in course:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
