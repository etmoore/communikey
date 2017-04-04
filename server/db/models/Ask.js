const knex = require('../knex');

function getAllAsks() {
  return knex('asks').select();
}

function getAsk(askID) {
  return knex('asks').where('id', parseInt(askID, 10)).first();
}

function createAsk(newAsk) {
  return knex('asks').insert(newAsk, 'id');
}

module.exports = {
  getAllAsks,
  getAsk,
  createAsk,
}
