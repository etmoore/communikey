exports.up = (knex, Promise) => {
  return knex.schema.alterTable('users', (table) => {
    table.string('email').unique().alter()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.alterTable('users', (table) => {
    table.dropUnique('email')
  })
}
