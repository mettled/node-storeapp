import Router from 'express';
import Course from '../models/course.js';
import auth from '../middleware/auth.js';

const router = Router();

router.get('/', auth, function (req, res) {
  res.render('add', {
    title: 'Add courses',
    active: 'add',
  });
});

router.post('/', auth, async function(req, res) {
  try {
    const { name, price, img } = req.body;
    const { user } = req;
    const course = new Course({ name, price, img, userID: user._id });
    await course.save(course);
    res.redirect('/courses');
  } catch (error) {
    console.log(error);
  }
});


export default router;