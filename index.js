import express from 'express';
import homeRouter from './routers/home.js';
import homeCourses from './routers/courses.js';
import homeAdd from './routers/add.js';
import homeCart from './routers/cart.js';

const app = express();

const PORT = process.env.PORT || 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use('/', homeRouter);
app.use('/courses', homeCourses);
app.use('/add', homeAdd);
app.use('/cart', homeCart);

app.listen(PORT, () => {
  console.log(`server starting by ${PORT}`)
});