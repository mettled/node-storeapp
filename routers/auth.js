import Router from 'express';
import User from '../models/user.js';
import bcrypt from 'bcryptjs'

const router = Router();

router.get('/', (req, res) => {
  // console.log(req.flash('register'), req.flash('login'))
  res.render('auth/auth.pug', {
    title: 'Autorization',
    active: 'auth',
    messageRegister: req.flash('register'),
    messageLogin: req.flash('login'),
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  })
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await User.findOne({email});
    if (!candidate) {
      req.flash('login', 'User is not exist.');
      res.redirect('/auth#login');
    }
    const areSame = await bcrypt.compare(password, candidate.password);
    if (areSame) {
      req.session.user = candidate;
      req.session.isAuthentificated = true;
      req.session.save((err) => {
        if (err) {
          throw err;
        }
        res.redirect('/');
      })
    } else {
      req.flash('login', 'Wrong password');
      res.redirect('/auth#login');
    }
  } catch (error) {
    console.log(error);
  }
});

router.post('/register', async (req, res) => {
  try {
    const { email, name, password, confirm } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      req.flash('register', 'This email exist !');
      res.redirect('/auth#register');
    } else {
      const hashPaswword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name, email, password: hashPaswword, cart: { items: [] }
      });
      await newUser.save();
      res.redirect('/auth#register');
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;