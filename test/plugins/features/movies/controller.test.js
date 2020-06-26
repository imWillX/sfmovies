'use strict';

const Controller = require('../../../../lib/plugins/features/movies/controller');

describe('movie controller', () => {

  describe('create', () => {

    it('creates a movie', async () => {
      const payload = { name: 'Up', release_year: 2012 };

      const movie = await Controller.create(payload);

      expect(movie.get('name')).to.eql(payload.name);
    });

  });

  describe('get', () => {

    it('retrieves all movies', async () => {
      const query = {};

      const movies = await Controller.get(query);

      expect(movies.length).to.be.above(0);
    });

    it('retrieves a movie by title', async () => {
      const query = { name: 'Up' };

      const movies = await Controller.get(query);

      const movie = await movies.fetchOne();

      expect(movie.get('name')).to.eql(query.name);
    });

    it('retrieves a movie by exact year', async () => {
      const query = { name: 'Up', release_year: 2012 };

      const movies = await Controller.get(query);

      const movie = await movies.fetchOne();

      expect(movie.get('release_year')).to.eql(query.release_year);
    });

    it('retrieves a movie by a range', async () => {
      const query = { release_year: 2012, release_year_end: 2014 };

      const movies = await Controller.get(query);

      const movie = await movies.fetchOne();

      expect(movie.get('release_year')).to.be.within(query.release_year, query.release_year_end);
    });

  });

});
