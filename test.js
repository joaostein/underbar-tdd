'use strict';

// Documentation: http://chaijs.com/api/bdd/

var chai = require('chai');
var expect = chai.expect;
var _ = require('./underbar');


describe('#identify()', function () {
  it('return the same value', function () {
    expect(_.identify(1)).to.equal(1);
    expect(_.identify('1')).to.equal('1');
    expect(_.identify(undefined)).to.equal(undefined);
    expect(_.identify(true)).to.equal(true);
    expect(_.identify(null)).to.equal(null);

    var myArray = [1, 2, 3];
    expect(_.identify(myArray)).to.equal(myArray);
    expect(_.identify(myArray)).to.not.equal([1, 2, 3]);

    var myObj = { key: 'value', key1: 'value1' };
    expect(_.identify(myObj)).to.equal(myObj);
    expect(_.identify(myObj)).to.not.equal({ key: 'value', key1: 'value1' });
  });

  it('should handle validate empty arguments', function () {
    expect(function () { _.identify(); }).to.throw(/Invalid Argument/);
  });
});
