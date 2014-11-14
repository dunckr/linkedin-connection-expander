var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    id: {
        type: String,
        unique: true
    },
    name: String,
    viewLink: String,
    timesVisited: Number,
    lastVisited: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
