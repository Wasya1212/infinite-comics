module.exports.get = (req, res, next) => {
  res.set('Content-Type', 'text/html');console.log('req to front');
  res.render('frontpage.pug', {
    user: req.user
  });
  next();
}
