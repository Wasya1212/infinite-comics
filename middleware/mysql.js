const mysql = require('promise-mysql');
const fs = require('fs');

module.exports = class MySQL {
  constructor(params) {
    this.pool = mysql.createPool(params);
  }

  createTable(tableName) {
    return new Promise((resolve, reject) => {
      this.pool.query(fs.readFileSync(`../models/${tableName}.sql`).toString())
        .then(resolve)
        .catch(reject);
    });
  }

  getList(tableName) {
    return new Promise((resolve, reject) => {
      this.pool.query(`SELECT * FROM ${tableName}`)
        .then(resolve)
        .catch(err => {
          err.errtable = tableName;
          reject(err);
        });
    });
  }

  insert(tableName, values) {

  }
}
