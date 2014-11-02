var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    lastVisited: {
        type: Date,
        default: Date.now
    },
    name: String,
    timesVisited: Number
});

module.exports = mongoose.model('User', userSchema);
