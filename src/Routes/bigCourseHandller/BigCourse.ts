import express, { Request, Response } from 'express';
import { BigCourse } from '../../DB/Models/BigCourseModel/BigCourse.js';
import { Lecture } from '../../DB/Models/BigCourseModel/Lecture.js';
const router = express.Router();

router.post('/lectures', async (req:Request, res:Response) => {
  try {
    const lecture = await Lecture.create(req.body);
    res.status(201).json(lecture);
  } catch (err:any) {
    res.status(400).json({ message: err.message });
  }
});

// Read all Lectures
router.get('/lectures', async (req:Request, res:Response) => {
  try {
    const lectures = await Lecture.find();
    res.json(lectures);
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
});

// Update Lecture
router.put('/lectures/:id', async (req:Request, res:Response) => {
  try {
    const { id } = req.params;
    const updatedLecture = await Lecture.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedLecture);
  } catch (err:any) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Lecture
router.delete('/lectures/:id', async (req:Request, res:Response) => {
  try {
    const { id } = req.params;
    await Lecture.findByIdAndDelete(id);
    res.json({ message: 'Lecture deleted successfully' });
  } catch (err:any) {
    res.status(400).json({ message: err.message });
  }
});

// BigCourse Routes
// Create BigCourse
router.post('/courses', async (req:Request, res:Response) => {
  try {
    const course = await BigCourse.create(req.body);
    res.status(201).json(course);
  } catch (err:any) {
    res.status(400).json({ message: err.message });
  }
});

// Read all BigCourses
router.get('/courses', async (req:Request, res:Response) => {
  try {
    const courses = await BigCourse.find();
    res.json(courses);
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
});

// Update BigCourse
router.put('/courses/:id', async (req:Request, res:Response) => {
  try {
    const { id } = req.params;
    const updatedCourse = await BigCourse.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedCourse);
  } catch (err:any) {
    res.status(400).json({ message: err.message });
  }
});

// Delete BigCourse
router.delete('/courses/:id', async (req:Request, res:Response) => {
  try {
    const { id } = req.params;
    await BigCourse.findByIdAndDelete(id);
    res.json({ message: 'BigCourse deleted successfully' });
  } catch (err:any) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
