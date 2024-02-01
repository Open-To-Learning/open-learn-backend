import { Request, Response } from 'express';
import { User } from '../Models/userModel';
import bcrypt from 'bcrypt';

interface UserInterface {
    fullName: string;
    userName: string;
    email: string;
    password: string;
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
        console.log('User saved successfully');
        
        res.status(201).json({
            staus:201,
            message:"Data saved successfully"
        }); // 201 status for resource created
    } catch (error) {
        console.error('Error in RegisterHandler:', error);
        res.status(500).json({
            staus:500,
            message:"internal server error"
        });
    }
}
