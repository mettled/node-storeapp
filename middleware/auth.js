export default (req, res, next) => {
  if (!req.session.isAuthentificated) {
    return res.redirect('/');
  }
  next();
}