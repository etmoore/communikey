const authHelpers = require('../../helpers/auth')

exports.seed = (knex, Promise) => {
  return knex('asks').del()
    .then(() => knex('users').del())
    .then(() => {
      const pwHash = authHelpers.hashPassword('testuser123')
      return knex('users').insert({
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@example.com',
        password: pwHash
      })
    })
}
