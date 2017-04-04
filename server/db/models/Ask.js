const knex = require('../knex');

function getAllAsks() {
  return knex('asks').select();
}

module.exports = {
  getAllAsks,
}
