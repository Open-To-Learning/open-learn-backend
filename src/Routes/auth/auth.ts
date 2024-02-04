import {Router} from 'express';
import RegisterHandler from './register';
import loginHandler from './login';
import addNewVideo from './user/addvideos';
import checkauth from '../../middleware/checkauth';
import DeleteVideo from './user/deletevideo';
import refetchVideo from './user/refechvideo';

const router = Router();



router.post('/register',RegisterHandler);
router.post('/login',loginHandler);
router.put('/addvideo',checkauth,addNewVideo);
router.put('/refetch/',checkauth,refetchVideo);
router.delete('/deleteVideo/',checkauth,DeleteVideo);

export default router;