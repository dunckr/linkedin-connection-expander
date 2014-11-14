var Pymk = require('../index');

describe('pymk', function() {

    var pymk;

    beforeEach(function() {
        pymk = new Pymk({
            email: 'test@email.com',
            password: 'topSecret'
        });
    });

    it('should throw error without options', function() {
        (function() {
            return new Pymk()
        }).should.throw('require login options');
    });

    it('should throw error without email options', function() {
        (function() {
            return new Pymk({
                password: '1pass'
            })
        }).should.throw('require email');
    });

    it('should throw error without password options', function() {
        (function() {
            return new Pymk({
                email: 'test@email.com'
            })
        }).should.throw('require password');
    });


    it('should parse the url for the id', function() {
        var url = 'https://www.linkedin.com/profile/view?id=012345678&amp;authType=name&amp;authToken=8o5N&amp;trk=connect_hub_pymk_profile_photo';
        (pymk.parseUrl(url)).should.equal('012345678');
    });


});
