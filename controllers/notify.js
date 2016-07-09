'use strict';

const Joi = require('joi');
const Boom = require('boom');
const webPush = require('web-push');
const urlBase64  = require('urlsafe-base64');
const Message = require('../models/message');
const Subscription = require('../models/subscription');

webPush.setGCMAPIKey(process.env.GCM_API_KEY);

exports.send = {
  validate: {
    payload: {
      messageId: Joi.string().required(),
      subscriberIds: Joi.array().items(Joi.string().required()).required()
    }
  },
  handler: (request, reply) => {
    const messagePromise = Message.findOne({ '_id': request.payload.messageId });
    const subscriptionsPromise = Subscription.find({
      '_id': {
        '$in': request.payload.subscriberIds
      }
    });

    Promise.all([messagePromise, subscriptionsPromise])
      .then(values => {
        const message = values[0];
        const subscriptions = values[1];
        let notificationPromises = [];

        subscriptions.forEach(subscription => {
          const notificationPromise = webPush.sendNotification(subscription.endpoint, {
            ttl: 0,
            userPublicKey: urlBase64.encode(subscription.keys.p256dh),
            userAuth: urlBase64.encode(subscription.keys.auth),
            payload: JSON.stringify({
              title: message.title,
              body: message.body
            })
          })
            .then((body) => {
              console.log('message sent', body);
            })
            .catch(err => {
              console.log(err);
            });

          notificationPromises.push(notificationPromise);
        });

        return Promise.all(notificationPromises);
      })
      .then(() => reply('Notified!'))
      .catch(err => reply(Boom.badImplementation('error', err)));
  }
}
