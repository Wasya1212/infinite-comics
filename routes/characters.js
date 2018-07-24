module.exports.get = (req, res, next) => {
  res.set('Content-Type', 'text/html');
  res.render('characters.pug', {
    user: req.user
  });
  next();
}
