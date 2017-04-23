
exports.up = (knex, Promise) => {
  return knex.schema.alterTable('asks', (table) => {
    table.integer('user_id').notNullable().alter()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.alterTable('asks', (table) => {
    table.integer('user_id').nullable().alter()
  })
}
