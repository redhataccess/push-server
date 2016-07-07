'use strict';

require('dotenv').config();

const Hapi = require('hapi');
const server = new Hapi.Server();
const routes = require('./routes');
const dbOptions = {
  url: process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost:27017/push'
};

server.connection({
  host: process.env.OPENSHIFT_NODEJS_IP || process.env.OPENSHIFT_INTERNAL_IP || 'localhost',
  port: process.env.OPENSHIFT_NODEJS_PORT || process.env.OPENSHIFT_INTERNAL_PORT || 8000,
  routes: {
    cors: true
  }
});

server.route(routes);

server.register({
  register: require('hapi-mongodb'),
  options: dbOptions
}, err => {
  if (err) {
    throw err;
  }

  server.start(err => {
    if (err) {
      throw err;
    }

    console.log(`Server running at: ${server.info.uri}`);
  });
});
