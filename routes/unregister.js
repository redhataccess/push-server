'use strict';

const Joi = require('joi');
const Boom = require('boom');

const unregister = {
  method: 'POST',
  path: '/unregister',
  config: {
    validate: {
      payload: {
        endpoint: Joi.string().required()
      }
    }
  },
  handler: unregisterHandler
};

function unregisterHandler(request, reply) {
  const db = request.server.plugins['hapi-mongodb'].db;

  db.collection('subscriptions').deleteOne({
    endpoint: request.payload.endpoint
  }, (err, result) => {
    if (err) {
      throw err;
      return reply(Boom.internal('Delete error', err));
    }

    return reply(result);
  });
}

module.exports = [
  unregister
];
