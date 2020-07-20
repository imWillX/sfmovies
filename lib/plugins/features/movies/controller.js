'use strict';

const Movie = require('../../../models/movie');
const Location = require('../../../models/location');
const ApplicationError = require('../../../error/ApplicationError');

exports.create = async (payload) => {
  const movie = await new Movie().save(payload);

  return new Movie({ id: movie.id }).fetch();
};

exports.createLocation = async (payload) => {
  const movie = await new Movie({ id: payload.movie_id }).fetch({ require: false });

  if (!movie) {
    throw new ApplicationError('The provided movie ID does not exists', 404);
  }

  await new Location().save(payload);

  return new Movie({ id: payload.movie_id }).fetch({ withRelated: ['locations'] });
};

exports.find = async (query) => {
  const movies = await new Movie().query((qb) => {
    if (query.name) {
      qb.where('name', 'like', query.name);
    }

    if (query.location) {
      qb.innerJoin('locations', 'movies.id', 'locations.movie_id')
      .where('locations.name', 'like', query.location);
    }

    if (query.release_year && query.release_year_end) {
      qb.whereBetween('release_year', [query.release_year, query.release_year_end]);
    } else if (query.release_year) {
      qb.where('release_year', '=', query.release_year);
    }
  })
  .fetchAll({ withRelated: ['locations'] });

  return movies;
};
