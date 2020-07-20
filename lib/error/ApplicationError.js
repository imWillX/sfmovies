'use strict';

module.exports = class ApplicationError extends Error {
  constructor (message, code) {
    super(message);
    this.name = 'MissingMovieError';
    this.code = code;
  }
};
