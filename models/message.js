'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MessageSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true }
});

const Message = mongoose.model('message', MessageSchema);

module.exports = Message;
