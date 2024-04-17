import {Router} from 'express';
import RegisterHandler from './register';
import loginHandler from './login';
import addNewVideo from './user/addvideos';
import checkauth from '../../middleware/checkauth';
import DeleteVideo from './user/deletevideo';
import refetchVideo from './user/refechvideo';
import logoutHandler from './logout';
import isValidCookie from './IsValidCookie';
import getUserDetails from './user/getUserDetails';
import EnrollInVideo from './user/enroll';

const router = Router();



router.post('/register',RegisterHandler);
router.post('/login',loginHandler);
router.post('/logout',logoutHandler);
router.put('/addvideo',checkauth,addNewVideo);
router.put('/refetch',checkauth,refetchVideo);
router.put('/enroll/:videoId',checkauth,EnrollInVideo)
router.delete('/deleteVideo',checkauth,DeleteVideo);
router.get('/is-valid-Cookie',isValidCookie);
router.get('/get-user-details/:userName',checkauth,getUserDetails);
export default router;