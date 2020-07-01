'use strict';

const Movies = require('../../../../lib/server');

describe('movies integration', () => {

  describe('create', () => {

    it('creates a movie', async () => {
      const response = await Movies.inject({
        url: '/movies',
        method: 'POST',
        payload: { name: 'Volver', release_year: 2014 }
      });

      expect(response.statusCode).to.eql(200);
      expect(response.result.object).to.eql('movie');
    });

    it('creates a movie by location', async () => {
      const response = await Movies.inject({
        url: '/movies/1/locations',
        method: 'POST',
        payload: { name: 'Lob Angeles' }
      });

      expect(response.statusCode).to.eql(200);
      expect(response.result.object).to.eql('movie');
    });

    it('returns an error when trying to access a movie that does not exist', async () => {
      const response = await Movies.inject({
        url: '/movies/55555/locations',
        method: 'POST',
        payload: { name: 'Lob Angeles' }
      });

      expect(response.result).to.have.all.keys([
        'error'
      ]);
    });

    describe('get', () => {

      it('gets a movie', async () => {
        const response = await Movies.inject({
          url: '/movies',
          method: 'GET',
          payload: {}
        });

        expect(response.statusCode).to.eql(200);
        expect(response.result[0].object).to.eql('movie');
      });

    });

  });

});
