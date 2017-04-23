exports.up = (knex) => {
  return knex.schema.table('asks', (table) => {
    table.integer('user_id').references('id').inTable('users')
  })
}

exports.down = (knex) => {
  return knex.schema.table('asks', (table) => {
    table.dropColumn('user_id')
  })
}
