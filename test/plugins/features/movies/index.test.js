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

    describe('get', () => {

      it('gets a movie', async () => {
        const response = await Movies.inject({
          url: '/movies', 
          method: 'GET',
          payload: {}
        });

        expect(response.statusCode).to.eql(200);
        expect(response.result.object[0]).to.eql('movie');
      });

    });

  })

});
