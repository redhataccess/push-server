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
      messageId: Joi.string().required()
      // subscriberIds: Joi.array().items(Joi.string().required()).required()
    }
  },
  handler: (request, reply) => {
    const messagePromise = Message.findOne({ '_id': request.payload.messageId });
    // const subscriptionsPromise = Subscription.find({
    //   '_id': {
    //     '$in': request.payload.subscriberIds
    //   }
    // });
    // for right now we'll just send to everyone
    const subscriptionsPromise = Subscription.find({});

    Promise.all([messagePromise, subscriptionsPromise])
      .then(values => {
        const message = values[0];
        const subscriptions = values[1];
        let notificationPromises = [];

        subscriptions.forEach(subscription => {
          const messageSubdoc = subscription.messages.create({ messageId: message._id });
          subscription.messages.push(messageSubdoc);
          subscription.save();

          message.subscriptions[subscription._id] = true;
          message.save();

          const messageData = Object.assign({}, message.data, {
            subscriptionId: subscription._id,
            messageId: messageSubdoc._id
          });

          const notificationPromise = webPush.sendNotification(subscription.endpoint, {
            ttl: 0,
            userPublicKey: urlBase64.encode(subscription.keys.p256dh),
            userAuth: urlBase64.encode(subscription.keys.auth),
            payload: JSON.stringify({
              title: message.title,
              body: message.body,
              data: messageData
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
