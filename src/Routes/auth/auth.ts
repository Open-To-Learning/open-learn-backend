import {Router} from 'express';
import RegisterHandler from './register';
import loginHandler from './login';
import addNewVideo from './user/addvideos';
import checkauth from '../../middleware/checkauth';

const router = Router();



router.post('/register',RegisterHandler);
router.post('/login',loginHandler);
router.put('/addvideo/:userName/:youtubeVideoId',checkauth,addNewVideo);

export default router;