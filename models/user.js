var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    id: String,
    name: String,
    viewLink: String,
    connectLink: String,
    timesVisited: Number,
    lastVisited: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
