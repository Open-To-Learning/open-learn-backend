import { Request, Response } from 'express';
import User from '../../DB/Models/userModel';;
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET_TOKEN } from '../../index';


function generateToken(userName: string, password: string): string {
    if (!SECRET_TOKEN) {
        throw new Error('User secret token not found');
    }

    const token = jwt.sign({ userName, password }, SECRET_TOKEN);
    return token;
}


async function checkpass(password: string, hashedPassword: string) {
    try {
        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, hashedPassword);
        if (passwordMatch) {
            return true;
        }
        return false;
        
    } catch (error) {
        console.error('Error in checkpass:', error);
        return false;
    }
}
export default async function loginHandler(req: Request, res: Response) {
    try {
        const { userName, email, password }: { userName: string; email: string; password: string } = req.body;

        if (!userName && !email) {
            return res.status(400).json({
                status: 400,
                message: 'Username or email is required'
            });
        }

        const user = await User.findOne({ $or: [{ userName }, { email }] });

        if (!user) {
            return res.status(404).json({
                status: 404,
                message: 'User not found'
            });
        }

        const passwordMatch = await checkpass(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ 
                status: 401,
                message: 'Incorrect password'
            });
        }

        const userJwtToken = generateToken(userName, user.password);

        // Set JWT token as a cookie
        res.cookie('user-token', userJwtToken, {
            httpOnly: true
        });

        return res.status(200).json({
            status: 200,
            message: 'User authenticated successfully'
        });

    } catch (error) {
        console.error('Error in loginHandler:', error);
        return res.status(500).json({
            status: 500,
            message: 'Internal Server Error'
        });
    }
}
