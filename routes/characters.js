const Character = require('../controllers/character');

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
  // console.log("QUERY ATTRIBUTES:", req.query);
  Character
    .findAll({
      limit: 20,
      // attributes: req.query
    })
    .then(characters => {
      console.log(characters);
      res.send(characters || {});
    })
    .catch(err => {
      if (err.original.errno == 1146) {
        console.error("SQL ERROR:", err.original.sqlMessage);
        res.sendStatus(404);
      } else {
        next(err);
      }
    });
}
