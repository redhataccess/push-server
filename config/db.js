'use strict';

const mongoose = require('mongoose');
const dbUrl = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost:27017/push';

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', console.log.bind(console, 'Connection with database succeeded'));

exports.mongoose = mongoose;
exports.db = db;
