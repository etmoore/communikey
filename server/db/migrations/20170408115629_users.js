exports.up = (knex) => (
  knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('email').notNullable()
    table.string('password').notNullable()
    table.string('firstName').notNullable()
    table.string('lastName').notNullable()
    table.timestamps(true, true)
  })
)

exports.down = (knex) => (
  knex.schema.dropTable('users')
)
