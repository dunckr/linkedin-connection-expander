var Nightmare = require('nightmare'),
    $ = require('cheerio');

var login = exports.login = function(email, password) {
    return function(nightmare) {
        nightmare
            .goto('https://www.linkedin.com/uas/login')
            .type('#session_key-login', email)
            .type('#session_password-login', password)
            .click('#btn-primary')
            .wait();
    };
};

var list = exports.list = function() {
    return function(nightmare) {
        nightmare
            .goto('https://www.linkedin.com/people/pymk')
            .wait();
    };
};

var getNext = exports.getNext = function() {
    return function(nightmare) {
        nightmare
            .evaluate(function() {
                return $(window).scrollTop($(document).height());
            })
            .wait();
    };
};

module.exports = pymk = function(options) {
    if (options.email === undefined) return 'require email';
    if (options.password === undefined) return 'require password';

    new Nightmare()
        .use(login(options.email, options.password))
        .use(list())
        .use(getNext())
        .use(getNext())
        .use(getNext())
        .screenshot('test.png')
        .run(function(err, nightmare) {
            console.log(err);
        });
};
