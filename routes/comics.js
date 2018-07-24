module.exports.get = (req, res, next) => {
  res.set('Content-Type', 'text/html');
  res.render('comics.pug', {
    user: req.user
  });
  next();
}
