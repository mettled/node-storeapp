import Router from 'express';
import Course from '../models/course.js';
import auth from '../middleware/auth.js';

const router = Router();

const getTotalPrice = (courses) => courses.reduce((acc, { count, courseID: { price }}) => acc + count * price , 0);

router.post('/add', auth, async (req, res) => {
  const { id } = req.body;
  const { user } = req;
  const course = await Course.findById(id);
  await user.addToCart(course);
  res.redirect('/cart');
});

router.delete('/delete/:id', auth, async (req, res) => {
  const { id } = req.params;
  await req.user.deleteFromCart(id);
  const user = await req.user.populate('cart.items.courseID', 'name price img').execPopulate();
  const { cart } = user.toObject();
  res.status(200).json({
    courses: cart.items,
    price: getTotalPrice(cart.items),
  })
});

router.get('/', auth, async (req, res) => {
  const user = await req.user.populate('cart.items.courseID', 'name price img').execPopulate();
  const { cart } = user;
  res.render('cart', {
    title: 'Cart',
    active: 'cart',
    courses: cart.items,
    price: getTotalPrice(cart.items),
  })
});

export default router;
