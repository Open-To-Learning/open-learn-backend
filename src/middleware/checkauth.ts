import { Request, Response, NextFunction } from "express";
import { SECRET_TOKEN } from "../index"; // Ensure that SECRET_TOKEN is correctly imported from your source file
import jwt from 'jsonwebtoken';

export default function checkauth(req: Request, res: Response, next: NextFunction) {
    // Check if cookies are available in the request
    if (!req.cookies) {
        return res.status(400).json({
            status: 400,
            message: 'Cookies not available in the request'
        });
    }

    // Check if the user-token cookie is present
    const user_token = req.cookies['user-token'];
    if (!user_token) {
        return res.status(401).json({
            status: 401,
            message: 'User not authenticated'
        });
    }

    // Check if SECRET_TOKEN is available
    if (!SECRET_TOKEN) {
        return res.status(500).json({
            status: 500,
            message: 'Server secret token not available'
        });
    }

    jwt.verify(user_token, SECRET_TOKEN as string, (err: any, decodedToken: any) => {
        if (err) {
            // Token verification failed
            return res.status(401).json({
                status: 401,
                message: 'Invalid token'
            });
            
        } else {
            // Token verification successful
            // console.log('Token verification successful:', decodedToken);
            req.params.cookiesData = decodedToken;

            // Call next() to pass control to the next middleware or route handler
            next();
        }
    });
}
