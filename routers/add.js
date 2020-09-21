import Router from 'express';
import Course from '../models/course.js';


const router = Router();

router.get('/', function (req, res) {
  res.render('add', {
    title: 'Add courses',
    active: 'add',
  });
});

router.post('/', function (req, res) {
  const { name, price, img } = req.body;
  const course = new Course(name, price, img);
  course.save(course);
  res.redirect('/courses');
});


export default router;