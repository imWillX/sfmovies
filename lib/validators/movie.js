'use strict';

const Joi = require('joi');

exports.CreateValidator = Joi.object().keys({
  name: Joi.string().min(1).max(255).required(),
  release_year: Joi.number().integer().min(1878).max(9999).optional()
});

exports.GetValidator = Joi.object().keys({
  name: Joi.string().min(1).max(255).optional(),
  release_year: Joi.number().integer().optional(),
  release_year_end: Joi.number().integer().min(Joi.ref('release_year')).optional(),
  location: Joi.string().min(1).max(255).optional()
});

exports.CreateLocationValidator = Joi.object().keys({
  name: Joi.string().min(1).max(255).required()
});
