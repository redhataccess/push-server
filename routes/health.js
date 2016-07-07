'use strict';

const health = {
  method: 'GET',
  path: '/health',
  handler: healthHandler
};

function healthHandler(request, reply) {
  return reply('Healthy');
}

module.exports = [
  health
];
