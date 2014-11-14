var $ = require('cheerio'),
    User = require('../models/user');

// Login to Linkedin
exports.login = function(email, password) {
    return function(nightmare) {
        nightmare
            .goto('https://www.linkedin.com/uas/login')
            .type('#session_key-login', email)
            .type('#session_password-login', password)
            .click('#btn-primary')
            .wait();
    };
};

// Display Inital List of Suggested Users
exports.initalListOfUsers = function() {
    return function(nightmare) {
        nightmare
            .goto('https://www.linkedin.com/people/pymk')
            .wait();
    };
};

// Display next page of Suggested Users
exports.nextPageOfUsers = function(count) {
    var numberOfPages = count || 1;
    return function(nightmare) {
        for (var i = 0; i < numberOfPages; i++) {
            nightmare
                .evaluate(function() {
                    // Work around for infinite scroll
                    return $(window).scrollTop($(document).height());
                })
                .wait();
        }
    };
};

// Extract List of all Users Elements
exports.extractListOfUsers = function() {
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

// Parse Identifer from URL
var parseId = function(url) {
    return url.match(/[?id]=([^&]*)/)[1];
};

// Parse the element for User data
var extractUser = function($el) {
    var url = $el.find('.image').attr('href');
    var user = {
        id: parseId(url),
        name: $el.find('.name').text(),
        viewLink: $el.find('img')
    };
    saveNewUser(user);
};

// Save User data to DB
var saveNewUser = function(data) {
    var user = new User(data);
    user.save();
};

// List of all of the Users in DB
var getAllUsers = exports.getAllUsers = function(fn) {
    User
        .find()
        .exec(fn);
};

// Vist a url and return
var visit = exports.visit = function(url) {
    return function(nightmare) {
        nightmare
            .goto(url)
            .wait()
            .back()
            .wait();
    };
};
