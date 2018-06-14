module.exports = poolConnection => {
  const User = require('../controllers/index')(poolConnection).User;
  const Image = require('../controllers/index')(poolConnection).Image;

  return {
    get: (req, res) => {
      res.set('Content-Type', 'text/html');
      res.render('create_user.pug');
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
