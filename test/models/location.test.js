'use strict';

const Location = require('../../lib/models/location');

describe('location model', () => {

  describe('serialize', () => {

    it('includes a field', () => {
      const location = Location.forge().serialize();

      expect(location).to.eql(undefined);
    });

  });

});
