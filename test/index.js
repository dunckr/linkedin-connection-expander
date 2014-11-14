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

    it('should setup default options', function() {
        (pymk.email).should.equal('test@email.com');
        (pymk.password).should.equal('topSecret');
        (pymk.maxTimesToVisit).should.equal(2);
        (pymk.timeBetweenVists).should.equal(604800);
    });

});
