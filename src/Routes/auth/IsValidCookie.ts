import { Request, Response, NextFunction } from "express";
import { SECRET_TOKEN } from "../../index"; // Ensure that SECRET_TOKEN is correctly imported from your source file
import jwt from 'jsonwebtoken';
import User from "../../DB/Models/userModel";


export default async function isValidCookie(req: Request, res: Response, next: NextFunction) {
    try {
        // Check if cookies are available in the request
        if (!req.cookies) {
            return res.status(400).json({ok:false, status: 400, message: 'Cookies not available in the request' });
        }

        // Check if the user-token cookie is present
        const user_token = req.cookies['user'];
        if (!user_token) {
            return res.status(401).json({ok:false, status: 401, message: 'User not authenticated' });
        } 

        // Check if SECRET_TOKEN is available
        if (!SECRET_TOKEN) {
            return res.status(500).json({ok:false, status: 500, message: 'Server secret token not available' });
        }

        const decodedToken:any = jwt.verify(user_token, SECRET_TOKEN as string) as { userName: string, email: string, password: string };
        
        const user = await User.findOne({
            $or: [
                { userName: decodedToken.userName,password:decodedToken.password },
                { email: decodedToken.email,password:decodedToken.password }
            ]
        });
        

        if (!user) {
            return res.status(404).json({ok:false, status: 404, message: 'User not found' });
        }
        res.status(200).json({
            ok:true,
            message:'user found !'
        })
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ status: 401, message: 'Invalid token' });
        }
        return res.status(500).json({ status: 500, message: 'Internal server error' });
    }
}
