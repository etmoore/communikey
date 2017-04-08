exports.up = (knex) => (
  knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('email').notNullable()
    table.string('password_hash').notNullable()
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.timestamps(true, true)
  })
)

exports.down = (knex) => (
  knex.schema.dropTable('users')
)
