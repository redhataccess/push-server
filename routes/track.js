'use strict';

const received = {
  method: 'GET',
  path: '/track/received',
  handler: receivedHandler
};

function receivedHandler(request, reply) {
  return reply('track received');
}

const opened = {
  method: 'GET',
  path: '/track/opened',
  handler: openedHandler
};

function openedHandler(request, reply) {
  return reply('track opened');
}

module.exports = [
  received,
  opened
];
