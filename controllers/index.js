'use strict';

const mysql = require('../middleware/mysql');

class Controller {
    constructor() {

    }

    static createUser(user) {
        if (typeof user === User) {
            console.log('User type');
        }
    }
}

module.exports = poolConnection => {
  return {
    User: require('./user')(poolConnection)
  };
}
