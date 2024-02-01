import {Request,Response,Router} from 'express';

const router = Router();


router.post('/',(req:Request,res:Response)=>{
    const {email,password} = req.body;
    res.send(req.body);
    

});
export default router;