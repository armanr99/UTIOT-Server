const mongoose = require('mongoose');

var GroupSchema = mongoose.Schema({
    name: { type: String, require: true },
    password: { type: String, require: true },
    thingspeak: Number,
});

GroupSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    delete obj.__v;
    return obj;
};
  
module.exports = mongoose.model('Group', GroupSchema);