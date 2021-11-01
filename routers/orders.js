import Router from 'express';
import Order from '../models/order.js';
import auth from '../middleware/auth.js';

const router = Router();

router.get('/', auth, async function (req, res) {
  const orders = await Order.find({ userID: req.user._id })
    .populate('courses.courseID', 'name price')
    .populate('userID', 'name email')
    .lean();

  res.render('orders', {
    title: 'My orders',
    active: 'orders',
    orders: orders.reverse()
  });
});

router.post('/', auth, async function(req, res) {
  try {
    const { user } = req;
    const { cart: { items } } = await user.populate('cart.items.courseID').execPopulate();
    const price = items.reduce((acc, { count, courseID: { price }}) => acc + count * price, 0);
    const order = new Order({ courses: user.cart.items, userID: user, price });
    await order.save();
    await user.clearCart();
    res.redirect('/orders');
  } catch (error) {
    console.log(error);
  }
});


export default router;