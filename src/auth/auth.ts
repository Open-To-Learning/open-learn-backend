import {Request,Response,Router} from 'express';

const router = Router();


router.post('/',(req:Request,res:Response)=>{
    const {email,password} = req.body;
    res.json({
        email,
        password
    });
    

});
export default router;