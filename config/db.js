var mongoose = require('mongoose');

var dbURI = 'mongodb://localhost/test';
mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
    console.log('Connected to db ' + dbURI);
});

mongoose.connection.on('error', function(err) {
    console.log('Connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
    console.log('Disconnected from DB.');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Disconnected from DB by app.');
        process.exit(0);
    });
});

require('./../models/user');
