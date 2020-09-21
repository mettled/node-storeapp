import Router from 'express';
import Cart from '../models/cart.js';
import Course from '../models/course.js';

const router = Router();

router.post('/add', async (req, res) => {
  const { id } = req.body;
  const course = await Course.getCourseById(id);
  await Cart.add(id, course);
  res.redirect('/cart');
});

router.get('/', async (req, res) => {
  const { courses, price, count } = await Cart.getCart();
  console.log(courses, price, count)
  res.render('cart', {
    title: 'Cart',
    active: 'cart',
    courses: Object.entries(courses),
    price,
    count,
  })
});

export default router;
