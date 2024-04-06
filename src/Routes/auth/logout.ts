import {Request,Response } from "express";
import jwt from 'jsonwebtoken';

export default function logoutHandler(req:Request,res:Response){
    const token = jwt.sign({},"123",{expiresIn:0});
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.cookie('user',token,{httpOnly:true,maxAge:1});
    res.status(200).send({
        ok:true,
        message:'successfuly loged out!'
    })


}