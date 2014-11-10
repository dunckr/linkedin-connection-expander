var pymk = require('../index');

var options = {
    email: 'yo@myemail.com',
    password: 'supersecret',
    maxTimesVisit: 3,
    timeBetweenVists: 60 * 60 * 24 * 10
};

pymk(options);
