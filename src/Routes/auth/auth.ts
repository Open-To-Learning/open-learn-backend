import {Router} from 'express';
import RegisterHandler from './register';
import loginHandler from './login';

const router = Router();



router.post('/register',RegisterHandler);
router.post('/login',loginHandler);

export default router;