module.exports.get = (req, res, next) => {
  res.set('Content-Type', 'text/html');
  res.render('tv.pug', {
    user: req.user
  });
  next();
}
