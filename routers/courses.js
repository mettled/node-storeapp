import Router from 'express';

const router = Router();

router.get('/', function (req, res) {
  res.render('courses', {
    title: 'Courses',
    active: 'courses',
  });
});


export default router;