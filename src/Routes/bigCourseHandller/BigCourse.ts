import { Router } from 'express';

import { CreateBigCourse, DeleteBigCourse, UpdateBigCourse ,getBigCourseDetails} from './CreateBigCourseHandller';
import checkauth from '../../middleware/checkauth';
import { CreateModule, DeleteModule, UpdateModule } from './CreateModule';
const router = Router();

// ------------ bigCourse modules ----------------------
router.get('/get-big-course/:id',checkauth,getBigCourseDetails);
router.post('/create-big-course',checkauth,CreateBigCourse);
router.put('/update-big-course',checkauth,UpdateBigCourse);
router.delete('/delete-big-course',checkauth,DeleteBigCourse);
// ------------ update modules ----------------------
router.post('/create-big-course-module',checkauth,CreateModule);
router.put('/update-big-course-module',checkauth,UpdateModule);
router.delete('/delete-big-course-module',checkauth,DeleteModule);
// ------------ update lectures ----------------------
// router.post('/create-lectures',checkauth,CreateLectures);
// router.put('/create-lectures',checkauth,UpdateLectures);
// router.delete('/create-lectures',checkauth,DeleteBigCourse);


export default router;
