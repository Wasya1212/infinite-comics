module.exports.get = (req, res, next) => {
  if (!req.user.admin) {
    res.status(403).send("Forbidden");
    return next();
  }

  res.set('Content-Type', 'text/html');
  res.render('admin.pug', {
    user: req.user
  });
  next();
}
