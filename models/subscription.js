'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SubscriptionSchema = new Schema({
  endpoint: { type: String, required: true },
  keys: {
    p256dh: { type: String, required: true },
    auth: { type: String, required: true }
  }
});

const Subscription = mongoose.model('subscription', SubscriptionSchema);

module.exports = Subscription;
