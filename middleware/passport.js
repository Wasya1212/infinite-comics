const passport = require('passport');
const LocalStrategy = require('passport-local');

const Sequelize = require('sequelize');
const sequelize = new Sequelize('user271351_infinite_comics', 'user271351', 'tfp7cRRoug4D', {
  host: '46.21.250.90',
  dialect: 'mysql',
  operatorsAliases: Sequelize.Op,
  pool: {
    max: 10,
    min: 0,
    idle: 100000
  }
});

const User = require('../models/user')(sequelize);

passport.serializeUser((user, done) => {
  console.log("USER:", user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log(id);
  User.findOne({
    where: {id: id}
  })
  .then(({dataValues: user}) => {
    done(null, user);
  })
  .catch(err => {
    done(err, null);
  });
});

passport.use(new LocalStrategy((username, password, done) => {
  console.log(username)
  User.findOne({
    where: {username: username}
  })
  .then(({dataValues: user}) => {
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }

    User.validPassword(password, user.password)
      .then(isMatch => {
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password.' });
        }
      })
  })
  .catch(done);
}));

module.exports = passport;