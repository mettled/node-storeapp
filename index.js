import express from 'express';
import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';
import csrf from 'csurf';
import flash from 'connect-flash';
import homeRouter from './routers/home.js';
import homeCourses from './routers/courses.js';
import homeAdd from './routers/add.js';
import homeCart from './routers/cart.js';
import homeOrders from './routers/orders.js';
import homeAuth from './routers/auth.js';
import mongoose from 'mongoose';
import varMiddleware from './middleware/variables.js';
import user from './middleware/user.js';

const mongoURL = 'mongodb+srv://mettled:A9BTCreq11rKXNIo@cluster0.optq1.mongodb.net/coursesApp?retryWrites=true&w=majority';

const MongoStore = MongoDBStore(session);
const store = new MongoStore({
  uri: mongoURL,
  collection: 'mySessions'
});


const app = express();

const PORT = process.env.PORT || 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use(session({
  secret: 'value',
  resave: false,
  saveUninitialized: false,
  store
}));
app.use(flash());
app.use(csrf());
app.use(varMiddleware);
app.use(user);
app.use('/', homeRouter);
app.use('/courses', homeCourses);
app.use('/add', homeAdd);
app.use('/cart', homeCart);
app.use('/orders', homeOrders);
app.use('/auth', homeAuth);



mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server starting by ${PORT}`)
    });
  })
  .catch((err) => {
    console.log(err);
  });
