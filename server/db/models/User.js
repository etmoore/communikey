const _ = require('lodash')
const knex = require('../knex')
const authHelpers = require('../../helpers/auth')

function getAllUsers (id) {
  return knex('users').select()
}

function getUserByID (id) {
  return knex('users').where('id', id).first()
}

function getUserByEmail (email) {
  return knex('users').where('email', email).first()
}

function createUser (userData) {
  userData = _.pick(userData, ['firstName', 'lastName', 'email', 'password'])
  userData.password = authHelpers.hashPassword(userData.password)
  return knex('users').insert(userData).returning('*')
}

module.exports = {
  getAllUsers,
  getUserByID,
  getUserByEmail,
  createUser
}
