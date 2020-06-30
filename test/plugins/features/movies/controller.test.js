'use strict';

const Controller = require('../../../../lib/plugins/features/movies/controller');

describe('movie controller', () => {

  describe('POST', () => {

    it('creates a movie', async () => {
      const payload = { name: 'Up', release_year: 2012 };

      const movie = await Controller.create(payload);

      expect(movie.get('name')).to.eql(payload.name);
    });

    it('creates a location associated with a movie', async () => {
      const payload = { name: 'Lob Angeles', movie_id: 1 };

      const movie = await Controller.createLocation(payload);

      expect(movie.related('locations').models[0].get('name')).to.eql(payload.name);
    });

  });

  describe('GET', () => {

    it('retrieves all movies', async () => {
      const query = {};

      const movies = await Controller.find(query);

      expect(movies.length).to.be.above(0);
    });

    it('retrieves a movie by title', async () => {
      const query = { name: 'Ant-Man' };

      const movies = await Controller.find(query);

      const movie = movies.models[0];

      expect(movie.get('name')).to.eql(query.name);
    });

    it('retrieves a movie by exact year', async () => {
      const query = { name: 'Up', release_year: 2012 };

      const movies = await Controller.find(query);

      const movie = movies.models[0];

      expect(movie.get('release_year')).to.eql(query.release_year);
    });

    it('retrieves a movie by a range', async () => {
      const query = { release_year: 2012, release_year_end: 2014 };

      const movies = await Controller.find(query);

      const movie = movies.models[0];

      expect(movie.get('release_year')).to.be.within(query.release_year, query.release_year_end);
    });

    it('retrieves movie by location', async () => {
      const query = { location: 'Lob Angeles' };

      const movies = await Controller.find(query);

      const movie = movies.models[0];

      const location = movie.related('locations').models[0].get('name');

      expect(location).to.eql(query.location);
    });

    it('retrieves no movie where release_year_end is less than release_year', async () => {
      const query = { release_year: 9999, release_year_end: 0 };
      const movies = await Controller.find(query);

      expect(movies.length).to.eql(0);
    });

  });

});
