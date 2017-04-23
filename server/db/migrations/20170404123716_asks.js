exports.up = knex => {
  return knex.schema.createTable('asks', (table) => {
    table.increments('id')
    table.string('title').notNullable()
    table.string('description').notNullable()
    table.dateTime('start').notNullable()
    table.dateTime('end').notNullable()
    table.string('location').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = knex => {
  return knex.schema.dropTable('asks')
}
