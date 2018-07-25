const Character = require('../controllers/character');

module.exports.get = (req, res, next) => {
  res.set('Content-Type', 'text/html');
  res.render('characters.pug', {
    user: req.user
  });
  next();
}

module.exports.post = (req, res) => {

}
