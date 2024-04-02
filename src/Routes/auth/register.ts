import { Request, Response } from 'express';
import User from '../../DB/Models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET_TOKEN } from '../../index';
// Ensure you have defined and set the USER_SECRET environment variable


interface UserInterface {
    fullName: string;
    userName: string;
    email: string;
    password: string;
}

function generateToken(userName: string, password: string): string {
    if (!SECRET_TOKEN) {
        throw new Error('User secret token not found');
    }

    const token = jwt.sign({ userName, password }, SECRET_TOKEN);
    return token;
}

// Function to generate a hashed password with salt
async function generateHashedPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export default async function RegisterHandler(req: Request, res: Response) {
    try {
        const { fullName, userName, email, password }: UserInterface = req.body;

        // Check if userName or email already exists in the database
        const existingUser = await User.findOne({ $or: [{ userName }, { email }] });
        if (existingUser) {
            return res.status(400).json({
                ok:false,
                status: 400,
                message: 'User with the same userName or email already exists!'
            });
        }

        // Generate hashed password
        const hashedPassword = await generateHashedPassword(password);

        // Create a new user document with the hashed password
        const user = new User({
            fullName,
            userName,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        await user.save();

        // Generate JWT token
        const userJwtToken = generateToken(userName, hashedPassword);
        
        // Set JWT token as a cookie
        res.cookie('user-token', userJwtToken, {
            httpOnly: true
        });

        res.status(201).json({
            ok:true,
            status: 201,
            message: "Data saved successfully"
        }); // 201 status for resource created
    } catch (error) {
        console.error('Error in RegisterHandler:', error);
        res.status(500).json({
            ok:false,
            status: 500,
            message: "Internal server error"
        });
    }
}
