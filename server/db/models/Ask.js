const knex = require('../knex');

function getAllAsks() {
  return knex('asks').select();
}

function getAsk(askID) {
  return knex('asks')
    .where('id', parseInt(askID, 10))
    .first();
}

function createAsk(newAsk) {
  return knex('asks')
    .insert(newAsk, 'id');
}

function updateAsk(askID, askData) {
  return knex('asks')
    .where('id', parseInt(askID, 10))
    .update(askData, 'id');
}

function deleteAsk(askID) {
  return knex('asks')
    .where('id', parseInt(askID, 10))
    .delete();
}

module.exports = {
  getAllAsks,
  getAsk,
  createAsk,
  updateAsk,
  deleteAsk,
};
