'use strict';

exports.up = function(Knex) {
	return Knex.raw('UPDATE movies SET name = title');
};

exports.down = function(Knex) {
  return Promise.resolve();
};
