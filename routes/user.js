const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));

module.exports = poolConnection => {
  const User = require('../controllers/index')(poolConnection).User;
  const Image = require('../controllers/index')(poolConnection).Image;

  return {
    get: (req, res) => {
      res.set('Content-Type', 'text/html');
      User.getUsers()
        .then(users => {
          console.log(users);
          res.render('create_user.pug');
        })
        .catch(err => {
          console.log(err);
        });
    },
    post: (req, res) => {
      let newUser = new User({
        username: req.body.username,
        nickname: req.body.nickname,
        email: req.body.email,
        password: req.body.password
      });
      newUser.save()
        .then(user => {
          console.log("User created!\n", user)
        })
        .catch(console.error);
      // poolConnection.getList('users')
      //   .then(users => {
      //     res.json(users);
      //   })
      //   .catch(err => {
      //     console.error(err);
      //     res.end("Any users not found");
      //   });
    }
  };
}
