'use strict';

const Joi = require('joi');

const register = {
  method: 'POST',
  path: '/register',
  config: {
    validate: {
      payload: {
        endpoint: Joi.string().required(),
        keys: {
          'p256dh': Joi.string().required(),
          'auth': Joi.string().required()
        }
      }
    }
  },
  handler: registerHandler
};

function registerHandler(request, reply) {
  const db = request.server.plugins['hapi-mongodb'].db;
  const registration = request.payload;

  registration.createDate = new Date();

  db.collection('subscriptions').insert(registration, (err, result) => {
    if (err) {
      return reply(Boom.internal('Insert error', err));
    }

    return reply(result);
  });
}

module.exports = [
  register
];
