import Router from 'express';
import Course from '../models/course.js';
import auth from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res) => {

  try {
    const courses = await Course.find({}).populate('userID', 'email name');
    res.render('courses', {
      title: 'Courses',
      active: 'courses',
      courses,
    });   
  } catch (error) {
    console.log(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id).lean();
    res.render('course', {
      title: `Course ${course.name}`,
      id,
      ...course,
    });  
  } catch (error) {
    console.log(error);    
  }
});

router.get('/edit/:id', auth, async (req, res) => {
  const { allow } = req.query;
  if (allow !== 'true') {
    return res.redirect('/');
  }

  try {
    const { id } = req.params;
    const course = await Course.findById(id).lean();
    res.render('course-edit', {
      title: `Course ${course.name}`,
      id,
      ...course,
  });  
  } catch (error) {
    console.log(error);
  }

});

router.post('/edit/:id', auth, async (req, res) => {
  try {
    const { id, name, img, price } = req.body;
    await Course.findByIdAndUpdate(id, { name, img, price });
    res.redirect('/courses');    
  } catch (error) {
    console.log(error);
  }
});

router.post('/delete', auth, async (req, res) => {
  try {
    const { id } = req.body;
    await Course.deleteOne({ _id: id });
    res.redirect('/courses');   
  } catch (error) {
    console.log(error);
  }
});

export default router;
