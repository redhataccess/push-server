'use strict';

const Joi = require('joi');
const Boom = require('boom');
const webPush = require('web-push');
const urlBase64  = require('urlsafe-base64');

webPush.setGCMAPIKey(process.env.GCM_API_KEY);

const notify = {
  method: 'POST',
  path: '/notify',
  config: {
    validate: {
      payload: {
        message: Joi.object().keys({
          title: Joi.string().required(),
          body: Joi.string().required(),
          icon: Joi.string(),
          data: Joi.object().keys({
            url: Joi.string()
          })
        }).optionalKeys('icon', 'data')
      }
    }
  },
  handler: notifyHandler
};

function notifyHandler(request, reply) {
  const db = request.server.plugins['hapi-mongodb'].db;
  const messageDefaults = {
    icon: 'images/touch/chrome-touch-icon-192x192.png'
  };
  
  db.collection('subscriptions').find().toArray((err, subscriptions) => {
    if (err) {
      return reply(Boom.internal('Find error', err));
    }

    subscriptions.forEach(subscription => {
      const message = Object.assign({}, messageDefaults, request.payload.message);

      webPush.sendNotification(subscription.endpoint, {
        ttl: 0,
        userPublicKey: urlBase64.encode(subscription.keys.p256dh),
        userAuth: urlBase64.encode(subscription.keys.auth),
        payload: JSON.stringify(message)
      })
        .then(body => {
          console.log(body);
        }, err => {
          console.log('Error', err);
        });
    });

    return reply('Done!');
  });
}

module.exports = [
  notify
];
