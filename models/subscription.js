'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  messageId: { type: Schema.Types.ObjectId },
  sent: { type: Date, default: Date.now },
  received: { type: Date, default: null },
  opened: { type: Date, default: null }
});

const SubscriptionSchema = new Schema({
  endpoint: { type: String, required: true },
  keys: {
    p256dh: { type: String, required: true },
    auth: { type: String, required: true }
  },
  messages: [MessageSchema]
});

const Subscription = mongoose.model('subscription', SubscriptionSchema);

module.exports = Subscription;
