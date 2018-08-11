const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../controllers/user');

passport.serializeUser((user, done) => {
  console.log("USER:", user)
  done(null, user.uuid);
});

passport.deserializeUser((id, done) => {
  console.log("USER ID:", id);
  User.findById(id)
  .then(({dataValues: user}) => {
    done(null, user);
  })
  .catch(err => {
    done(err, null);
  });
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, done) => {
  User.findByEmail(email)
  .then((user) => {
    if (!user) {
      console.log("user not found");
      return done(null, false, { message: 'Incorrect username.' });
    }

    User.validPassword(password, user.password)
      .then(isMatch => {
        if (isMatch) {
          console.log("USER IS CORRECT");
          return done(null, user);
        } else {
          console.log("USER IS NOT CORRECT");
          return done(null, false, { message: 'Incorrect password.' });
        }
      })
  })
  .catch(done);
}));

module.exports = passport;
