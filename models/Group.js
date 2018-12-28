const mongoose = require('mongoose');

var GroupSchema = mongoose.Schema({
    name: { type: String, require: true },
    thingSpeak: Number
});

module.exports = mongoose.model('Group', GroupSchema);