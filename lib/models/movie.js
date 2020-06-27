'use strict';

const Bookshelf = require('../libraries/bookshelf');
const Location = require('./location');

module.exports = Bookshelf.Model.extend({
  tableName: 'movies',
  locations: function () {
    return this.hasMany(Location);
  },
  serialize: function () {
    return {
      id: this.get('id'),
      name: this.get('name'),
      release_year: this.get('release_year'),
      locations: this.related('locations'),
      object: 'movie'
    };
  }
});
