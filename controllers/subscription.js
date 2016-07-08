'use strict';

const Joi = require('joi');
const Boom = require('boom');
const Subscription = require('../models/subscription');

exports.getAll = {
  handler: (request, reply) => {
    Subscription.find({})
      .then(subscriptions => reply(subscriptions));
  }
};

exports.getOne = {
  handler: (request, reply) => {
    Subscription.findOne({ '_id': request.params.subscriptionId })
      .then(subscription => reply(subscription))
      .catch(err => reply(Boom.notFound('missing', err)));
  }
};

exports.create = {
  validate: {
    payload: {
      endpoint: Joi.string().required(),
      keys: {
        'p256dh': Joi.string().required(),
        'auth': Joi.string().required()
      }
    }
  },
  handler: (request, reply) => {
    const subscription = new Subscription(request.payload);
    subscription.save()
      .then(subscription => reply(subscription));
  }
};

exports.remove = {
  handler: (request, reply) => {
    Subscription.findOne({ '_id': request.params.subscriptionId })
      .then(subscription => {
        subscription.remove();
        return reply(subscription);
      })
      .catch(err => reply(Boom.notFound('missing', err)));
  }
}
