'use strict';

// Documentation: http://chaijs.com/api/bdd/

var chai = require('chai');
var expect = chai.expect;
var _ = require('./underbar');


describe('#identity()', function () {
  it('return the same value', function () {
    expect(_.identity(1)).to.equal(1);
    expect(_.identity('1')).to.equal('1');
    expect(_.identity(undefined)).to.equal(undefined);
    expect(_.identity(true)).to.equal(true);
    expect(_.identity(null)).to.equal(null);

    var myArray = [1, 2, 3];
    expect(_.identity(myArray)).to.equal(myArray);
    expect(_.identity(myArray)).to.not.equal([1, 2, 3]);

    var myObj = { key: 'value', key1: 'value1' };
    expect(_.identity(myObj)).to.equal(myObj);
    expect(_.identity(myObj)).to.not.equal({ key: 'value', key1: 'value1' });
  });

  it('should handle validate empty arguments', function () {
    expect(function () { _.identity(); }).to.throw();
  });
});

describe('#first()', function () {
  var myArray;

  beforeEach(function () {
    myArray = [1, 2, 3];
  });

  it('should return the first element of array', function () {
    expect(_.first(myArray)).to.equal(1);
  });

  it('should return the first `n` elements of array', function () {
    expect(_.first(myArray, 2)).to.deep.equal([1, 2]);
  });

  it('should return the first element with `n` equals one', function () {
    expect(_.first(myArray, 1)).to.equal(1);
  });

  it('should return the first element with `n` equals zero', function () {
    expect(_.first(myArray, 0)).to.equal(1);
  });

  it('should return all elements when `n` greater than array length', function () {
    expect(_.first(myArray, 100)).to.deep.equal([1, 2, 3]);
  });

  it('should only accept arrays as first parameters', function () {
    expect(function () { _.first(false); }).to.throw();
    expect(function () { _.first(undefined); }).to.throw();
    expect(function () { _.first(null); }).to.throw();
    expect(function () { _.first({}); }).to.throw();
    expect(function () { _.first(1); }).to.throw();
    expect(function () { _.first('string'); }).to.throw();
  });
});
