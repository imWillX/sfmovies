'use strict';

const Joi = require('joi');

const MovieValidator = require('../../lib/validators/movie');

describe('movie validator', () => {

  describe('GET', () => {

    describe('name', () => {

      it('is required', () => {
        const payload = {};
        const result = Joi.validate(payload, MovieValidator.CreateValidator);

        expect(result.error.details[0].path[0]).to.eql('name');
        expect(result.error.details[0].type).to.eql('any.required');
      });

      it('is less than 255 characters', () => {
        const payload = {
          name: 'a'.repeat(260),
          release_year: 2000
        };
        const result = Joi.validate(payload, MovieValidator.CreateValidator);

        expect(result.error.details[0].path[0]).to.eql('name');
        expect(result.error.details[0].type).to.eql('string.max');
      });

    });

    describe('release_year', () => {

      it('is a digit', () => {
        const payload = { release_year: 'a' };
        const result = Joi.validate(payload, MovieValidator.GetValidator);

        expect(result.error.details[0].path[0]).to.eql('release_year');
        expect(result.error.details[0].type).to.eql('number.base');
      });

      it('release_year_end is less than release_year', async () => {
        const payload = { release_year: '2014', release_year_end: '2013' };
        const result = Joi.validate(payload, MovieValidator.GetValidator);

        expect(result.error.details[0].path[0]).to.eql('release_year_end');
        expect(result.error.details[0].type).to.eql('number.min');
      });

    });

  });

  describe('POST', () => {

    describe('name', () => {

      it('is required', () => {
        const payload = {};
        const result = Joi.validate(payload, MovieValidator.CreateValidator);

        expect(result.error.details[0].path[0]).to.eql('name');
        expect(result.error.details[0].type).to.eql('any.required');
      });

      it('is less than 255 characters', () => {
        const payload = {
          name: 'a'.repeat(260),
          release_year: 2000
        };
        const result = Joi.validate(payload, MovieValidator.CreateValidator);

        expect(result.error.details[0].path[0]).to.eql('name');
        expect(result.error.details[0].type).to.eql('string.max');
      });

    });

    describe('release_year', () => {

      it('is after 1878', () => {
        const payload = {
          name: '2020',
          release_year: 1877
        };
        const result = Joi.validate(payload, MovieValidator.CreateValidator);

        expect(result.error.details[0].path[0]).to.eql('release_year');
        expect(result.error.details[0].type).to.eql('number.min');
      });

      it('is limited to 4 digits', () => {
        const payload = {
          name: '2020',
          release_year: 10000
        };
        const result = Joi.validate(payload, MovieValidator.CreateValidator);

        expect(result.error.details[0].path[0]).to.eql('release_year');
        expect(result.error.details[0].type).to.eql('number.max');
      });

    });

  });

});
