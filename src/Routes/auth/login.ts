import { Request, Response } from 'express';
import { User } from '../../DB/Models/userModel';
import bcrypt from 'bcrypt';

async function checkpass(res: Response, password: string, hashedPassword: string) {
    try {
        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, hashedPassword);
        if (passwordMatch) {
            return res.status(200).json({
                status: 200,
                message: 'User and password are correct!'
            });
        } else {
            return res.status(401).json({
                status: 401,
                message: 'Incorrect password!'
            });
        }
    } catch (error) {
        console.error('Error in checkpass:', error);
        return res.status(500).json({
            status: 500,
            message: 'Internal server error!'
        });
    }
}

export default async function loginHandler(req: Request, res: Response) {
    try {
        const { userName, email, password }: { userName: string; email: string; password: string } = req.body;
        
        if (userName) {
            const user = await User.findOne({ userName });
            if (user) {
                // Call checkpass with the hashed password from the user object
                await checkpass(res, password, user.password);
            } else {
                return res.status(404).json({
                    status: 404,
                    message: 'User not found!'
                });
            }
        } else {
            const user = await User.findOne({ email });
            if (user) {
                // Call checkpass with the hashed password from the user object
                await checkpass(res, password, user.password);
            } else {
                return res.status(404).json({
                    status: 404,
                    message: 'Email not found!'
                });
            }
        }
    } catch (error) {
        console.error('Error in loginHandler:', error);
        return res.status(500).json({
            status: 500,
            message: 'Internal Server Error'
        });
    }
}
