const colors = require('colors');

module.exports.handle = () => (err, req, res, next) => {
  console.log(colors.bgRed.underline("Unhandled server error:"));
  console.log(colors.white(err));
}

module.exports.sqlHandle = () => (err, req, res, next) => {
  if (!err.original) {
    return next(err);
  }
  if (err.original.errno == 1146) {
    console.error(colors.bgGreen("SQL ERROR:"), colors.green.underline(err.original.sqlMessage));
    res.status(404).send("Table & data not initiated!");
  } else {
    next(err);
  }
}
