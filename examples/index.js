var Pymk = require('../index');

var options = {
    email: 'example@mail.com',
    password: 'topSecret',
    maxTimesToVisit: 3,
    timeBetweenVists: 60 * 60 * 24 * 10,
    numberOfPages: 4
};

var pymk = new Pymk(options);
pymk.run();
