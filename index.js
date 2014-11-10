var Nightmare = require('nightmare'),
    $ = require('cheerio'),
    db = require('./config/db'),
    User = require('./models/user');

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

var showUsers = exports.showUsers = function() {
    return function(nightmare) {
        nightmare
            .goto('https://www.linkedin.com/people/pymk')
            .wait();
    };
};

var getNextUsers = exports.getNextUsers = function() {
    return function(nightmare) {
        nightmare
            .evaluate(function() {
                // Work around for infinite scroll
                return $(window).scrollTop($(document).height());
            })
            .wait();
    };
};

var listUsers = exports.listUsers = function() {
    return function(nightmare) {
        nightmare
            .evaluate(function() {
                return document.documentElement.innerHTML;
            }, function(res) {
                var $els = $(res).find('.entityblock');
                $els.each(function(index, el) {
                    extractUser($(el));
                });
            })
            .wait();
    };
};

var extractUser = function($el) {
    var url = $el.find('.image').attr('href'),
        id = parseId(url);
    User.find({
        id: id
    }, function(err, obj) {

        if (obj.length === 0) {
            var user = new User({
                id: id,
                name: $el.find('.name').text(),
                viewLink: $el.find('img'),
                connectLink: $el.find('.bt-request-buffed')
            });
            user.save(function(err, obj) {
                console.log(obj);
            });
        }
    });
};

var parseId = function(url) {
    return url.match(/[?id]=([^&]*)/)[1];
};

var visit = exports.visit = function(url) {
    return function(nightmare) {
        nightmare
            .goto(url)
            .wait()
            .back()
            .wait();
    };
};

module.exports = pymk = function(options) {
    if (options.email === undefined) return 'require email';
    if (options.password === undefined) return 'require password';

    var maxTimesVisit = options.maxVisitTime || 2,
        timeBetweenVists = options.timeBetweenVists || 60 * 60 * 24 * 7;

    new Nightmare()
        .use(login(options.email, options.password))
        .screenshot('testloggedin.png')
        .use(showUsers())
        .use(getNextUsers())
        .use(getNextUsers())
        .use(getNextUsers())
        .use(listUsers())
        .screenshot('testlistingusers.png')
        .run(function(err, nightmare) {
            console.log(err);
        });
};
