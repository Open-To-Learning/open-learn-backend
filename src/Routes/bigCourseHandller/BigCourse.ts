import { Router } from 'express';

import { CreateBigCourse, DeleteBigCourse, UpdateBigCourse } from './CreateBigCourseHandller';
import checkauth from '../../middleware/checkauth';
const router = Router();

router.post('/create-big-course',checkauth,CreateBigCourse);
router.put('/update-big-course',checkauth,UpdateBigCourse);
router.delete('/delete-big-course',checkauth,DeleteBigCourse);
// router.post('/create-lectures',checkauth,CreateLectures);
// router.put('/create-lectures',checkauth,UpdateLectures);
// router.delete('/create-lectures',checkauth,DeleteBigCourse);


export default router;
