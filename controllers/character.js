'use strict';

const Character = require('../models/character');

class CharacterController {
  constructor() {
    this.tableName = Character.getTableName();
  }

  save(conditions) {
    return Character.create(conditions);
  }

  findById(id) {
    Character.findById(id);
  }

  findOne() {
    return Character.findOne();
  }

  findAll(conditions) {
    return Character.findAll(conditions);
  }

  findByName(name) {
    return Character.findOne({ where: { name: name } });
  }

  findAllByName(name) {
    return Character.findAll({ where: { name: name } });
  }
}

module.exports = new CharacterController();
