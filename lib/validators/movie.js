'use strict';

const Joi = require('joi');

exports.Create = Joi.object().keys({
  name: Joi.string().min(1).max(255).required(),
  release_year: Joi.number().integer().min(1878).max(9999).optional()
});

exports.Get = Joi.object().keys({
  name: Joi.string().min(1).max(255).optional(),
  release_year: Joi.number().integer().optional(),
  release_year_end: Joi.number().integer().min(Joi.ref('release_year')).optional(),
  location: Joi.string().min(1).max(255).optional()
});

exports.CreateLocation = Joi.object().keys({
  name: Joi.string().min(1).max(255).required()
});
