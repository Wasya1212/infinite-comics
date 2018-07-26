// create database connection
const mysql = require('../middleware/mysql');

let poolConnection = new mysql({
  connectionLimit: 10,
  host: 'sql7.freemysqlhosting.net',
  user: 'sql7242175',
  password: 'UcG1k1f9zf',
  database: 'sql7242175'
});

// get routes controllers
const frontpageRouter = require('./frontpage');
const shopRouter = require('./shop');
const newsRouter = require('./news');
const moviesRouter = require('./movies');
const tvRouter = require('./tv');
const comicsRouter = require('./comics');
const charactersRouter = require('./characters');
const authRouter = require('./auth');
const adminRouter = require('./admin');

// set controllers
module.exports = (app) => {
  // authentication
  app.get('/login', authRouter.login.get);
  // app.post('/login', authRouter.login);
  app.get('/logout', authRouter.logout);

  // check auth
  app.get('/*', authRouter.checkAuth);

  // frontpage
  app.get('/', frontpageRouter.get);

  // admin
  app.get('/admin', adminRouter.get);

  // shop
  app.get('/shop', shopRouter.get);

  // news
  app.get('/news', newsRouter.get);

  // tv
  app.get('/tv', tvRouter.get);

  // movies
  app.get('/movies', moviesRouter.get);

  // comics
  app.get('/comics', comicsRouter.get);

  // characters
  app.get('/characters', charactersRouter.get);
  app.post('/characters/all', charactersRouter.post);
  app.put('/characters/create', charactersRouter.put);

  // app.post('/user', userRouter.post);

  // not found
  // app.get('/*', (req, res, next) => {
  //   res.set('Content-Type', 'text/plain');
  //   res.send("Fuck you!");
  //   next();
  // });
}
