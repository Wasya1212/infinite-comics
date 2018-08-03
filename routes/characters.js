const Character = require('../controllers/character');
const User = require('../controllers/user');

module.exports.get = (req, res, next) => {
  res.set('Content-Type', 'text/html');
  res.render('characters.pug', {
    user: req.user
  });
  next();
}

module.exports.put = (req, res, next) => {
  console.log(req.body);
  // Character.save();
}

module.exports.post = (req, res, next) => {
  // Character.save({
  //   name: Date.now() + 'afsdf',
  //   image: 'ggg'
  // });
  //
  Character
    .findAll({
      limit: 20,
      // attributes: req.query
    })
    .then(characters => {
      console.log("FIND CHARACTERS:");
      console.log("FIND CHARACTERS:", characters);
      res.send(characters);
    })
    .catch(err => {
      next(err);
    });
}
