module.exports = poolConnection => {
  return {
    get: (req, res, next) => {
      res.set('Content-Type', 'text/html');
      res.render('frontpage.pug');
      next();
    }
  };
}
