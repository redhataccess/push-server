'use strict';

const Joi = require('joi');
const Boom = require('boom');
const Message = require('../models/message');

exports.getAll = {
  handler: (request, reply) => {
    Message.find({})
      .then(message => {
        console.log(message);
        return reply(message);
      });
  }
};

exports.getOne = {
  handler: (request, reply) => {
    Message.findOne({ '_id': request.params.messageId })
      .then(message => reply(message))
      .catch(err => reply(Boom.notFound('missing', err)));
  }
}

exports.create = {
  validate: {
    payload: {
      title: Joi.string().required(),
      body: Joi.string().required(),
      data: Joi.object()
    }
  },
  handler: (request, reply) => {
    const message = new Message(request.payload);

    message.save()
      .then(result => {
        console.log(result);

        return reply(result);
      })
      .catch(err => {
        console.log(err)
      });
  }
};

exports.remove = {
  handler: (request, reply) => {
    Message.findOne({ '_id': request.params.messageId })
      .then(message => {
        message.remove();
        return reply(message);
      })
      .catch(err => reply(Boom.notFound('missing', err)));
  }
}
