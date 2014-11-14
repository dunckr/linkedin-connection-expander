var Nightmare = require('nightmare'),
    db = require('./config/db'),
    LinkedIn = require('./lib/linkedin');

exports = module.exports = Pymk;

function Pymk(options) {
    if (options === undefined) throw new Error('require login options');
    if (options.email === undefined) throw new Error('require email');
    if (options.password === undefined) throw new Error('require password');

    this.email = options.email;
    this.password = options.password;
    this.maxTimesToVisit = options.maxTimesToVisit || 2;
    this.timeBetweenVists = options.timeBetweenVists || 60 * 60 * 24 * 7;
    this.numberOfPages = options.numberOfPages || 2;
}

Pymk.prototype.run = function() {
    this.extractUsers();
    this.visitRequiredUsers();
};

Pymk.prototype.extractUsers = function() {
    new Nightmare()
        .use(LinkedIn.login(this.email, this.password))
        .use(LinkedIn.initalListOfUsers())
        .use(LinkedIn.nextPageOfUsers(this.numberOfPages))
        .use(LinkedIn.extractListOfUsers())
        .run();
};

Pymk.prototype.visitRequiredUsers = function() {
    LinkedIn.getAllUsers(function(err, users) {
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            this.visitUser(user.id);
        }
    });
};

Pymk.prototype.visitUser = function(id) {
    var url = 'https://www.linkedin.com/profile/view?id=' + id;
    new Nightmare()
        .use(LinkedIn.visit(url))
        .run();
};
