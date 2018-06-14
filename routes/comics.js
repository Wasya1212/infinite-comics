module.exports = poolConnection => {
  return {
    get: (req, res) => {
      res.set('Content-Type', 'text/html');
      res.render('comics.pug');
    }
  };
}
