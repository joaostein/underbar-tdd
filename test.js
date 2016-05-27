'use strict';

// Documentation: http://chaijs.com/api/bdd/

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var _ = require('./underbar');


var predicate1 = function (value) {
  return value >= 3;
};

var predicate2 = function (value) {
  return value % 2 === 0;
};

var arrayCollection = [1, 2, 3, 4];
var objectCollection = { item1: 1, item2: 2, item3: 3, item4: 4 };
var spy = sinon.spy();


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

describe('Filters', function () {
  describe('#_filter()', function () {
    it('should exist', function () {
      expect(_).to.respondTo('_filter');
    });

    it('should execute the predicate callback function for each item in array', function () {
      _._filter(arrayCollection, spy);
      expect(spy.callCount).to.equal(arrayCollection.length);
      spy.reset();
    });

    it('should execute the predicate callback function for each item in object', function () {
      _._filter(objectCollection, spy);
      expect(spy.callCount).to.equal(Object.keys(objectCollection).length);
      spy.reset();
    });
  });

  describe('#filter()', function () {
    it('should exist', function () {
      expect(_).to.respondTo('filter');
    });

    it('should return an empty array on invalid collections', function () {
      expect(_.filter()).to.deep.equal([]);
      expect(_.filter(false)).to.deep.equal([]);
      expect(_.filter(undefined)).to.deep.equal([]);
      expect(_.filter(null)).to.deep.equal([]);
      expect(_.filter('string')).to.deep.equal([]);
      expect(_.filter(1)).to.deep.equal([]);
    });

    it('should return an array with elements that match predicate using array collection', function () {
      expect(_.filter(arrayCollection, predicate2)).to.deep.equal([2, 4]);
      expect(_.filter(arrayCollection, predicate1)).to.deep.equal([3, 4]);
    });

    it('should return an array with elements that match predicate using object collection', function () {
      expect(_.filter(objectCollection, predicate2)).to.deep.equal([2, 4]);
      expect(_.filter(objectCollection, predicate1)).to.deep.equal([3, 4]);
    });
  });

  describe('#reject()', function () {
    it('should exist', function () {
      expect(_).to.respondTo('reject');
    });

    it('should return an empty array on invalid collections', function () {
      expect(_.reject()).to.deep.equal([]);
      expect(_.reject(false)).to.deep.equal([]);
      expect(_.reject(undefined)).to.deep.equal([]);
      expect(_.reject(null)).to.deep.equal([]);
      expect(_.reject('string')).to.deep.equal([]);
      expect(_.reject(1)).to.deep.equal([]);
    });

    it('should return an array with elements that does not match predicate using array collection', function () {
      expect(_.reject(arrayCollection, predicate2)).to.deep.equal([1, 3]);
      expect(_.reject(arrayCollection, predicate1)).to.deep.equal([1, 2]);
    });

    it('should return an array with elements that match predicate using object collection', function () {
      expect(_.reject(objectCollection, predicate2)).to.deep.equal([1, 3]);
      expect(_.reject(objectCollection, predicate1)).to.deep.equal([1, 2]);
    });
  });
});

describe('#uniq()', function () {
  it('should exist', function () {
    expect(_).to.respondTo('uniq');
  });

  it('should throw an error if invalid argument', function () {
    expect(function () { _.uniq(false); }).to.throw();
    expect(function () { _.uniq(undefined); }).to.throw();
    expect(function () { _.uniq(null); }).to.throw();
    expect(function () { _.uniq({}); }).to.throw();
    expect(function () { _.uniq(1); }).to.throw();
    expect(function () { _.uniq('string'); }).to.throw();
  });

  it('should return a different array', function () {
    var uniq = _.uniq(arrayCollection);
    expect(uniq).to.be.an('array');
    expect(uniq).to.not.equal(arrayCollection);
  });

  it('should return an identical array if given array is already uniq', function() {
    var uniq = _.uniq(arrayCollection);
    expect(uniq).to.deep.equal(arrayCollection);
  });

  it('should return an uniq array if given array is not uniq', function () {
    var uniq = _.uniq([1, 2, 1, 4, 1, 3]);
    expect(uniq).to.deep.equal([1, 2, 4, 3]);
  });

  it('should return uniq array with any kind of data contained in array', function () {
    var uniq = _.uniq(['str', null, undefined, false, false, undefined, 'str3', 'str']);
    expect(uniq).to.deep.equal(['str', null, undefined, false, 'str3']);
  });
});

describe('#map()', function () {
  var mapFn = function (item) {
    return item * 3;
  };

  it('should exist', function () {
    expect(_).to.respondTo('map');
  });

  it('should return an empty array on invalid collection', function () {
    expect(_.map()).to.deep.equal([]);
    expect(_.map(false)).to.deep.equal([]);
    expect(_.map(undefined)).to.deep.equal([]);
    expect(_.map(null)).to.deep.equal([]);
    expect(_.map('string')).to.deep.equal([]);
    expect(_.map(1)).to.deep.equal([]);
  });

  it('should execute the iteratee callback function for each item in array', function () {
    _.map(arrayCollection, spy);
    expect(spy.callCount).to.equal(arrayCollection.length);
    spy.reset();
  });

  it('should execute the iteratee callback function for each item in object', function () {
    _.map(objectCollection, spy);
    expect(spy.callCount).to.equal(Object.keys(objectCollection).length);
    spy.reset();
  });

  it('should return an array with modified elements using an array collection', function () {
    expect(_.map(arrayCollection, mapFn)).to.deep.equal([3, 6, 9, 12]);
    expect(_.map([[1, 2], [3, 4]], _.first)).to.deep.equal([1, 3]);
  });

  it('should return an array with modified elements using an object collection', function () {
    expect(_.map(arrayCollection, mapFn)).to.deep.equal([3, 6, 9, 12]);
  });
});

describe('#pluck()', function () {
  it('should exist', function () {
    expect(_).to.respondTo('pluck');
  });

  it('should return an empty array on invalid collection', function () {
    expect(_.pluck()).to.deep.equal([]);
    expect(_.pluck(false)).to.deep.equal([]);
    expect(_.pluck(undefined)).to.deep.equal([]);
    expect(_.pluck(null)).to.deep.equal([]);
    expect(_.pluck('string')).to.deep.equal([]);
    expect(_.pluck(1)).to.deep.equal([]);
  });

  it('should return an array filled with undefined values if it is not an object collection', function () {
    expect(_.pluck(arrayCollection)).to.deep.equal([undefined, undefined, undefined, undefined]);
  });

  it('should return an array with a list of property values', function () {
    var people = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
    expect(_.pluck(people, 'name')).to.deep.equal(['moe', 'larry', 'curly']);
    expect(_.pluck(people, 'age')).to.deep.equal([40, 50, 60]);
  });
});
