'use strict';

const unregister = {
  method: 'POST',
  path: '/unregister',
  handler: unregisterHandler
};

function unregisterHandler(request, reply) {
  return reply('unregister');
}

module.exports = [
  unregister
];
