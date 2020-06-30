'use strict';

const Movie = require('../../../models/movie');

exports.create = async (payload) => {
  const movie = await new Movie().save(payload);

  return new Movie({ id: movie.id }).fetch();
};

exports.get = async (query) => {
  const movies = await new Movie().query((qb) => {
    if (query.name) {
      qb.where('name', 'like', query.name);
    }

    if (query.release_year && query.release_year_end) {
      qb.whereBetween('release_year', [query.release_year, query.release_year_end]);
    } else if (query.release_year) {
      qb.where('release_year', '=', query.release_year);
    }
  })
  .fetchAll();

  return movies;
};
