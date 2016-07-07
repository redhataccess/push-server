'use strict';

const health = require('./health');
const register = require('./register');
const unregister = require('./unregister');
const notify = require('./notify');
const track = require('./track');

module.exports = [].concat(
  health,
  register,
  unregister,
  notify,
  track
);
