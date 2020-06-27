'use strict';

exports.up = function (knex) {
  return knex.schema.createTable('locations', (table) => {
    table.increments('id').primary();
    table.text('name').notNullable();
    table.integer('movie_id').notNullable();

    table.foreign('movie_id').references('id').inTable('movies');
  });
};

exports.down = function (knex) {
  knex.schema.dropTable('locations');
};
