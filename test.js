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

describe('Helpers', function () {
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
});

describe('Utility', function () {
  describe('#identity()', function () {
    it('return the same value', function () {
      expect(_.identity(1)).to.equal(1);
      expect(_.identity('1')).to.equal('1');
      expect(_.identity(undefined)).to.equal(undefined);
      expect(_.identity(true)).to.equal(true);
      expect(_.identity(null)).to.equal(null);

      expect(_.identity(arrayCollection)).to.equal(arrayCollection);
      expect(_.identity(arrayCollection)).to.not.equal([1, 2, 3, 4]);

      expect(_.identity(objectCollection)).to.equal(objectCollection);
      expect(_.identity(objectCollection)).to.not.equal({ item1: 1, item2: 2, item3: 3, item4: 4 });
    });

    it('should throw an erro with empty argument', function () {
      expect(function () { _.identity(); }).to.throw();
    });
  });
});

describe('Arrays', function () {
  describe('#first()', function () {
    it('should return the first element of array', function () {
      expect(_.first(arrayCollection)).to.equal(1);
    });

    it('should return the first `n` elements of array', function () {
      expect(_.first(arrayCollection, 2)).to.deep.equal([1, 2]);
    });

    it('should return the first element with `n` equals one', function () {
      expect(_.first(arrayCollection, 1)).to.equal(1);
    });

    it('should return the first element with `n` equals zero', function () {
      expect(_.first(arrayCollection, 0)).to.equal(1);
    });

    it('should return all elements when `n` greater than array length', function () {
      expect(_.first(arrayCollection, 100)).to.deep.equal([1, 2, 3, 4]);
    });

    it('should only accept arrays as first parameters', function () {
      expect(function () { _.first(false); }).to.throw();
      expect(function () { _.first(undefined); }).to.throw();
      expect(function () { _.first(null); }).to.throw();
      expect(function () { _.first({}); }).to.throw();
      expect(function () { _.first(1); }).to.throw();
      expect(function () { _.first('string'); }).to.throw();
    });

    it('should not mutate original array', function () {
      var length = arrayCollection.length;
      _.first(arrayCollection, 1);
      expect(arrayCollection.length).to.equal(length);
    });
  });

  describe('#last()', function () {
    it('should return the last element of array', function () {
      expect(_.last(arrayCollection)).to.equal(4);
    });

    it('should return the last `n` elements of array', function () {
      expect(_.last(arrayCollection, 2)).to.deep.equal([4, 3]);
    });

    it('should return the last element with `n` equals one', function () {
      expect(_.last(arrayCollection, 1)).to.equal(4);
    });

    it('should return the last element with `n` equals zero', function () {
      expect(_.last(arrayCollection, 0)).to.equal(4);
    });

    it('should return all elements when `n` greater than array length', function () {
      expect(_.last(arrayCollection, 100)).to.deep.equal([4, 3, 2, 1]);
    });

    it('should only accept arrays as first parameters', function () {
      expect(function () { _.first(false); }).to.throw();
      expect(function () { _.first(undefined); }).to.throw();
      expect(function () { _.first(null); }).to.throw();
      expect(function () { _.first({}); }).to.throw();
      expect(function () { _.first(1); }).to.throw();
      expect(function () { _.first('string'); }).to.throw();
    });

    it('should not mutate original array', function () {
      var length = arrayCollection.length;
      _.last(arrayCollection, 1);
      expect(arrayCollection.length).to.equal(length);
    });
  });

  describe('#indexOf()', function () {
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
      expect(_.indexOf(arrayCollection, 1)).to.equal(0);
      expect(_.indexOf(arrayCollection, 2)).to.equal(1);
      expect(_.indexOf(arrayCollection, 3)).to.equal(2);
      expect(_.indexOf(arrayCollection, 4)).to.equal(3);
    });

    it('should return -1 if element not found', function () {
      expect(_.indexOf(arrayCollection, 101)).to.equal(-1);
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
});

describe('Collections', function () {
  describe('#each()', function () {
    afterEach(function () {
      spy.reset();
    });

    it('should iterate an array', function () {
      _.each(arrayCollection, spy);
      expect(spy.callCount).to.equal(4);
    });

    it('should invoke sandbox.callback with element, index and list parameters on array', function () {
      _.each(arrayCollection, spy);
      expect(spy.calledWith(1, 0, arrayCollection)).to.equal(true);
      expect(spy.calledWith(2, 1, arrayCollection)).to.equal(true);
      expect(spy.calledWith(3, 2, arrayCollection)).to.equal(true);
      expect(spy.calledWith(4, 3, arrayCollection)).to.equal(true);
    });

    it('should iterate an object', function () {
      _.each(objectCollection, spy);
      expect(spy.callCount).to.equal(4);
    });

    it('should invoke spy with element, index and list parameters on object', function () {
      _.each(objectCollection, spy);
      expect(spy.calledWith(1, 'item1', objectCollection)).to.equal(true);
      expect(spy.calledWith(2, 'item2', objectCollection)).to.equal(true);
      expect(spy.calledWith(3, 'item3', objectCollection)).to.equal(true);
      expect(spy.calledWith(4, 'item4', objectCollection)).to.equal(true);
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

  describe('#reduce()', function () {
    it('should exist', function () {
      expect(_).to.respondTo('reduce');
    });

    it('should accept initial memo value', function () {
      var reducedValue = _.reduce(arrayCollection, function (memo, num) {
        return memo + num;
      }, 10);

      expect(reducedValue).to.equal(20);
    });

    it('should skip first element if memo not provided', function () {
      _.reduce(arrayCollection, spy);
      expect(spy.callCount).to.equal(arrayCollection.length - 1);
      spy.reset();
    });

    it('should use first element as memo when memo is not provided', function () {
      var argumentList = [];

      _.reduce(arrayCollection, function (memo, num, index, list) {
        argumentList.push(memo);
      });

      expect(argumentList[0]).to.equal(1);
    });

    it('should not skip first element if initial memo is zero', function () {
      _.reduce(arrayCollection, spy, 0);
      expect(spy.callCount).to.equal(arrayCollection.length);
      spy.reset();
    });

    it('should invoke iteratee function for each item in list', function () {
      _.reduce(arrayCollection, spy, 1);
      expect(spy.callCount).to.equal(arrayCollection.length);
      spy.reset();
    });

    it('should pass correct arguments to iteratee function', function () {
      var argumentList = [];

      _.reduce(arrayCollection, function (memo, num, index, list) {
        argumentList.push([memo, num, index, list]);
        return memo + num;
      }, 0);

      expect(argumentList[0]).to.deep.equal([0, 1, 0, arrayCollection]);
      expect(argumentList[1]).to.deep.equal([1, 2, 1, arrayCollection]);
      expect(argumentList[2]).to.deep.equal([3, 3, 2, arrayCollection]);
      expect(argumentList[3]).to.deep.equal([6, 4, 3, arrayCollection]);
    });

    it('should pass correct arguments to iteratee function when memo not provided', function () {
      var argumentList = [];

      _.reduce(arrayCollection, function (memo, num, index, list) {
        argumentList.push([memo, num, index, list]);
        return memo + num;
      });

      expect(argumentList[0]).to.deep.equal([1, 2, 0, arrayCollection]);
      expect(argumentList[1]).to.deep.equal([3, 3, 1, arrayCollection]);
      expect(argumentList[2]).to.deep.equal([6, 4, 2, arrayCollection]);
    });

    it('should reduce an array into a single value', function () {
      var reducedValue = _.reduce(arrayCollection, function (memo, num) {
        return memo + num;
      });

      expect(reducedValue).to.equal(10);
    });

    it('should flatten an array', function () {
      var reducedValue = _.reduce([[0, 1], [2, 3], [4, 5]], function (memo, item, index, list) {
        return memo.concat(item);
      }, []);
      expect(reducedValue).to.deep.equal([0, 1, 2, 3, 4, 5]);
    });
  });

  describe('#contains()', function () {
    it('should exist', function () {
      expect(_).to.respondTo('contains');
    });

    it('should reject invalid arguments', function () {
      expect(function () { _.contains(); }).to.throw();
      expect(function () { _.contains(''); }).to.throw();
      expect(function () { _.contains(1); }).to.throw();
      expect(function () { _.contains(false); }).to.throw();
      expect(function () { _.contains(undefined); }).to.throw();
      expect(function () { _.contains(null); }).to.throw();
    });

    it('should find given element in array list', function () {
      expect(_.contains(arrayCollection, 1)).to.equal(true);
    });

    it('should return false if given element is not present in array list', function () {
      expect(_.contains(arrayCollection, 101)).to.equal(false);
    });

    it('should find given element in object list', function () {
      expect(_.contains(objectCollection, 1)).to.equal(true);
    });

    it('should return false if given element is not present in object list', function () {
      expect(_.contains(objectCollection, 101)).to.equal(false);
    });
  });
});
