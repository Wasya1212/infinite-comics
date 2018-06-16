const mysql = require('promise-mysql');
const fs = require('fs');
const path = require('path');

module.exports = class MySQL {
  constructor(params) {
    this.pool = mysql.createPool(params);
  }

  createTable(tableName) {
    const createQuery = fs.readFileSync(path.resolve(__dirname, `../schemas/${tableName}.sql`)).toString();
    return this.pool.query(createQuery);
  }

  getList(tableName, selectvalues = {}) {
    let sql = Object.entries(selectvalues)
      .map(column => {
        return `${column[0]}'${column[1]}'`;
      })
      .join(' AND ');

    console.log(sql);

    return this.pool.query(`SELECT * FROM ${tableName} ${sql}`);
  }

  insert(tableName, values) {
    let tableFields = Object.keys(values);
    let tableFieldsValues = tableFields.map(key => values[key]);

    return this.pool.query(`INSERT INTO ${tableName}(${tableFields.join(', ')}) VALUES('${tableFieldsValues.join("', '")}')`)
      .catch(err => {
        if (err.errno == 1146) {
          return this.createTable(tableName)
            .then(newTable => {
              console.log('New table created!\n', newTable);
              return this.insert(tableName, values);
            })
        } else {
          throw err;
        }
      });
  }
}
