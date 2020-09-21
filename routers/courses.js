import Router from 'express';
import Course from '../models/course.js';

const router = Router();

router.get('/', async (req, res) => {
  const allCourses = await Course.getAll();
  const courses = Object.entries(allCourses);
  res.render('courses', {
    title: 'Courses',
    active: 'courses',
    courses,
  });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const course = await Course.getCourseById(id);
  res.render('course', {
    title: `Course ${course.name}`,
    ...course,
  });
});

router.get('/edit/:id', async (req, res) => {
  const { allow } = req.query;
  if (allow !== 'true') {
    return res.redirect('/');
  }

  const { id } = req.params;
  const course = await Course.getCourseById(id);
  res.render('course-edit', {
    title: `Course ${course.name}`,
    id,
    ...course,
  });
});

router.post('/edit/:id', async (req, res) => {
  await Course.update(req.body);
  res.redirect('/courses');
});



export default router;