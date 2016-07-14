'use strict';

const Health = require('./controllers/health');
const Subscription = require('./controllers/subscription');
const Message = require('./controllers/message');
const Notify = require('./controllers/notify');

module.exports = [
  { method: 'GET',    path: '/health', config: Health.get },
  { method: 'GET',    path: '/subscription', config: Subscription.getAll },
  { method: 'POST',   path: '/subscription', config: Subscription.create },
  { method: 'GET',    path: '/subscription/{subscriptionId}', config: Subscription.getOne },
  { method: 'DELETE', path: '/subscription/{subscriptionId}', config: Subscription.remove },
  { method: 'GET',    path: '/subscription/{subscriptionId}/track/{messageId}/received', config: Subscription.messageReceived },
  { method: 'GET',    path: '/subscription/{subscriptionId}/track/{messageId}/opened', config: Subscription.messageOpened  },
  { method: 'GET',    path: '/message', config: Message.getAll },
  { method: 'POST',   path: '/message', config: Message.create },
  { method: 'GET',    path: '/message/{messageId}', config: Message.getOne },
  { method: 'DELETE', path: '/message/{messageId}', config: Message.remove },
  { method: 'POST',   path: '/notify', config: Notify.send }
];
