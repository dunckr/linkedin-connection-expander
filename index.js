var Nightmare = require('nightmare');

module.exports = pymk = function(options) {
    if (options.email === undefined) return 'require email';
    if (options.password === undefined) return 'require password';

    new Nightmare()
        .use(login(options.email, options.password))
        .screenshot('test.png')
        .run(function(err, nightmare) {
            console.log(err);
        });
};

var login = exports.login = function(email, password) {
    return function(nightmare) {
        nightmare
            .goto('https://www.linkedin.com/uas/login')
            .type('#session_key-login', email)
            .type('#session_password-login', password)
            .click('#btn-primary')
            .wait()
    };
};
