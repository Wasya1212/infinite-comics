'use strict';

const Character = require('../models/character');

class CharacterController {
  constructor() {
    this.tableName = Character.getTableName;
    this.findOne = Character.findOne;
    this.findAll = Character.findAll;
    this.findById = Character.findById;
  }

  save(conditions) {
    return Character.create(conditions);
  }

  findByName(name) {
    return Character.findOne({ where: { name: name } });
  }

  findAllByName(name) {
    return Character.findAll({ where: { name: name } });
  }
}

module.exports = new CharacterController();
