'use strict';

// Documentation: http://chaijs.com/api/bdd/

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
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

describe('#last()', function () {
  var myArray;

  beforeEach(function () {
    myArray = [1, 2, 3];
  });

  it('should return the last element of array', function () {
    expect(_.last(myArray)).to.equal(3);
  });

  it('should return the last `n` elements of array', function () {
    expect(_.last(myArray, 2)).to.deep.equal([3, 2]);
  });

  it('should return the last element with `n` equals one', function () {
    expect(_.last(myArray, 1)).to.equal(3);
  });

  it('should return the last element with `n` equals zero', function () {
    expect(_.last(myArray, 0)).to.equal(3);
  });

  it('should return all elements when `n` greater than array length', function () {
    expect(_.last(myArray, 100)).to.deep.equal([3, 2, 1]);
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

describe('#each()', function () {
  var array = [1, 2];
  var obj = { key: 'value', key1: 'value1' };
  var sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
    sandbox.callback = sinon.spy();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('should iterate an array', function () {
    _.each(array, sandbox.callback);
    expect(sandbox.callback.callCount).to.equal(2);
  });

  it('should invoke sandbox.callback with element, index and list parameters on array', function () {
    _.each(array, sandbox.callback);
    expect(sandbox.callback.calledWith(1, 0, array)).to.equal(true);
    expect(sandbox.callback.calledWith(2, 1, array)).to.equal(true);
  });

  it('should iterate an object', function () {
    _.each(obj, sandbox.callback);
    expect(sandbox.callback.callCount).to.equal(2);
  });

  it('should invoke sandbox.callback with element, index and list parameters on object', function () {
    _.each(obj, sandbox.callback);
    expect(sandbox.callback.calledWith('value', 'key', obj)).to.equal(true);
    expect(sandbox.callback.calledWith('value1', 'key1', obj)).to.equal(true);
  });
});

describe('#indexOf()', function () {
  var myArray = [0, 1, 2, 3, 4];

  it('should exist', function () {
    expect(_).to.respondTo('indexOf');
  });

  it('should only accept arrays', function () {
    expect(function () { _.indexOf({}); }).to.throw();
    expect(function () { _.indexOf(''); }).to.throw();
    expect(function () { _.indexOf(1); }).to.throw();
    expect(function () { _.indexOf(undefined); }).to.throw();
    expect(function () { _.indexOf(null); }).to.throw();
  });

  it('should return the position of given element', function () {
    expect(_.indexOf(myArray, 0)).to.equal(0);
    expect(_.indexOf(myArray, 1)).to.equal(1);
    expect(_.indexOf(myArray, 2)).to.equal(2);
    expect(_.indexOf(myArray, 3)).to.equal(3);
    expect(_.indexOf(myArray, 4)).to.equal(4);
  });

  it('should return -1 if element not found', function () {
    expect(_.indexOf(myArray, 101)).to.equal(-1);
  });
});
