const knex = require('../knex')
const authHelpers = require('../../helpers/auth')

function getUserByID (id) {
  return knex('users').where('id', id).first()
}

function getUserByEmail (email) {
  return knex('users').where('email', email).first()
}

function createUser (userData) {
  userData.password = authHelpers.hashPassword(userData.password)
  return knex('users').insert(userData).returning('*')
}

module.exports = {
  getUserByID,
  getUserByEmail,
  createUser
}
