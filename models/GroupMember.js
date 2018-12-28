const mongoose = require('mongoose');

var GroupMemberSchema = mongoose.Schema({
    group: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true }
});

module.exports = mongoose.model('GroupMember', GroupMemberSchema);