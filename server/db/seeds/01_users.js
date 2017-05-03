const authHelpers = require('../../helpers/auth')

exports.seed = knex => {
  return knex('asks').del()
    .then(() => knex('users').del())
    .then(() => {
      return knex('users').insert([
        {
          firstName: 'Test',
          lastName: 'User',
          email: 'testuser@example.com',
          password: authHelpers.hashPassword('testuser123')
        },
        {
          firstName: 'Another',
          lastName: 'User',
          email: 'anotheruser@example.com',
          password: authHelpers.hashPassword('anotheruser123')
        }
      ])
    })
}
