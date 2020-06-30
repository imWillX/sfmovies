'use strict';

const Controller = require('./controller');
const MovieValidator = require('../../../validators/movie');

exports.register = (server, options, next) => {

  server.route([{
    method: 'POST',
    path: '/movies',
    config: {
      handler: (request, reply) => {
        reply(Controller.create(request.payload));
      },
      validate: {
        payload: MovieValidator.CreateValidator
      }
    }
  },
  {
    method: 'GET',
    path: '/movies',
    config: {
      handler: (request, reply) => {
        reply(Controller.find(request.query));
      },
      validate: {
        query: MovieValidator.GetValidator
      }
    }
  },
  {
    method: 'POST',
    path: '/movies/{id}/locations',
    config: {
      handler: (request, reply) => {
        Controller.createLocation({ movie_id: request.params.id, ...request.payload })
        .then((resp) => reply(resp))
        .catch(/* istanbul ignore next */ (err) => reply.response(err).code(404));
      },
      validate: {
        payload: MovieValidator.CreateLocationValidator
      }
    }
  }]);

  next();

};

exports.register.attributes = {
  name: 'movies'
};
