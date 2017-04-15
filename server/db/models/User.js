const knex = require('../knex')
const authHelpers = require('../../helpers/auth')

function getUser (userID) {
  return knex('users').where('id', userID)
}

function createUser (userData) {
  userData.password = authHelpers.hashPassword(userData.password)
  return knex('users').insert(userData).returning('*')
}

module.exports = {
  getUser,
  createUser
}
