import Router from 'express';

const router = Router();

router.get('/', function (req, res) {
  res.render('add', {
    title: 'Add courses',
    active: 'add',
  });
});

router.post('/', function (req, res) {
  const { body } = req;
  
  console.log(body)
  res.redirect('/courses');
  // res.render('add', {
  //   title: 'Add courses',
  //   active: 'add',
  // });
});


export default router;