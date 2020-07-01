'use strict';

const Controller = require('./controller');
const MovieValidator = require('../../../validators/movie');
const ApplicationError = require('../../../error/ApplicationError');

exports.register = (server, options, next) => {

  server.route([{
    method: 'POST',
    path: '/movies',
    config: {
      handler: (request, reply) => {
        reply(Controller.create(request.payload));
      },
      validate: {
        payload: MovieValidator.Create
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
        query: MovieValidator.Get
      }
    }
  },
  {
    method: 'POST',
    path: '/movies/{id}/locations',
    config: {
      handler: (request, reply) => {
        Controller.createLocation({ movie_id: request.params.id, ...request.payload })
        .then((message) => {
          reply(message);
        }).catch((err) => {
          if (err instanceof ApplicationError) {
            reply.response(err.message).code(err.code);
          } else {
            reply('An unexpected error has occurred. Please try again later.').code(500);
          }
        });
      },
      validate: {
        payload: MovieValidator.CreateLocation
      }
    }
  }]);

  next();

};

exports.register.attributes = {
  name: 'movies'
};
