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
const frontpageRouter = require('./frontpage')(poolConnection);
const shopRouter = require('./shop')(poolConnection);
const newsRouter = require('./news')(poolConnection);
const moviesRouter = require('./movies')(poolConnection);
const tvRouter = require('./tv')(poolConnection);
const comicsRouter = require('./comics')(poolConnection);
const charactersRouter = require('./characters')(poolConnection);
const userRouter = require('./user')(poolConnection);

// set controllers
module.exports = (app) => {
  // frontpage
  app.get('/', frontpageRouter.get);

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

  // user
  app.get('/user', userRouter.get);
  app.post('/user', userRouter.post);

  // not found
  app.get('/*', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send("Fuck you!");
  });
}
