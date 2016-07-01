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

describe('Objects', function () {
  describe('#extend()', function () {
    it('should exist', function () {
      expect(_).to.respondTo('extend');
    });

    it('should reject invalid arguments on destination object', function () {
      expect(function () { _.extend(); }).to.throw();
      expect(function () { _.extend(''); }).to.throw();
      expect(function () { _.extend(1); }).to.throw();
      expect(function () { _.extend(false); }).to.throw();
      expect(function () { _.extend(undefined); }).to.throw();
      expect(function () { _.extend([]); }).to.throw();
      expect(function () { _.extend(null); }).to.throw();
    });

    it('should reject invalid arguments on source object', function () {
      expect(function () { _.extend({}, ''); }).to.throw();
      expect(function () { _.extend({}, 1); }).to.throw();
      expect(function () { _.extend({}, false); }).to.throw();
      expect(function () { _.extend({}, []); }).to.throw();
      expect(function () { _.extend({}, null); }).to.throw();
    });

    it('should return the same object if no source was given', function () {
      var obj = {};
      var objWithKeys = { a: 1, b: 2 };

      expect(_.extend(obj)).to.deep.equal(obj);
      expect(_.extend(objWithKeys)).to.deep.equal(objWithKeys);
    });

    it('should extend the destination object with a single key:value pair', function () {
      var destination = {};
      var source = { a: 1 };

      var extendedObject = _.extend(destination, source);

      expect(extendedObject).to.equal(destination);
      expect(extendedObject.a).to.equal(1);
    });

    it('should extend the destination object with a multiple key:value pairs', function () {
      var destination = {};
      var source = { a: 1, b: 2 };

      var extendedObject = _.extend(destination, source);

      expect(extendedObject).to.equal(destination);
      expect(extendedObject.a).to.equal(1);
      expect(extendedObject.b).to.equal(2);
    });

    it('should override the destination object with a single key:value pair present on source', function () {
      var destination = { a: 'a' };
      var source = { a: 1 };

      var extendedObject = _.extend(destination, source);

      expect(extendedObject).to.equal(destination);
      expect(extendedObject.a).to.equal(1);
    });

    it('should override the destination object with a multiple key:value pairs present on source', function () {
      var destination = { a: 'a', b: 'b' };
      var source = { a: 1, b: 2 };

      var extendedObject = _.extend(destination, source);

      expect(extendedObject).to.equal(destination);
      expect(extendedObject.a).to.equal(1);
      expect(extendedObject.b).to.equal(2);
    });

    it('should preserve properties on destination that are not present on source', function () {
      var destination = { j: 's', b: 'b' };
      var source = { a: 1, b: 2 };

      var extendedObject = _.extend(destination, source);

      expect(extendedObject).to.equal(destination);
      expect(extendedObject.a).to.equal(1);
      expect(extendedObject.b).to.equal(2);
      expect(extendedObject.j).to.equal('s');
    });

    it('should accept multiple sources', function () {
      var destination = {};
      var source1 = { a: 1, b: 2 };
      var source2 = { a: 11, b: 22 };

      var extendedObject = _.extend(destination, source1, source2);

      expect(extendedObject).to.equal(destination);
      expect(extendedObject.a).to.equal(11);
      expect(extendedObject.b).to.equal(22);
    });

    it('should preseve a mix of destination and multiple sources values', function () {
      var destination = { a: false, j: 's', };
      var source1 = { a: 1, b: 2, c: 33 };
      var source2 = { a: 11, b: 22, d: 44 };

      var extendedObject = _.extend(destination, source1, source2);

      expect(extendedObject).to.equal(destination);
      expect(extendedObject.a).to.equal(11);
      expect(extendedObject.b).to.equal(22);
      expect(extendedObject.c).to.equal(33);
      expect(extendedObject.d).to.equal(44);
      expect(extendedObject.j).to.equal('s');
    });
  });

  describe('#defaults()', function () {
    it('should exist', function () {
      expect(_).to.respondTo('defaults');
    });

    it('should reject invalid arguments on source object', function () {
      expect(function () { _.defaults(); }).to.throw();
      expect(function () { _.defaults(''); }).to.throw();
      expect(function () { _.defaults(1); }).to.throw();
      expect(function () { _.defaults(false); }).to.throw();
      expect(function () { _.defaults(undefined); }).to.throw();
      expect(function () { _.defaults([]); }).to.throw();
      expect(function () { _.defaults(null); }).to.throw();
    });

    it('should reject invalid arguments on defaults object', function () {
      expect(function () { _.defaults({}, ''); }).to.throw();
      expect(function () { _.defaults({}, 1); }).to.throw();
      expect(function () { _.defaults({}, false); }).to.throw();
      expect(function () { _.defaults({}, []); }).to.throw();
      expect(function () { _.defaults({}, null); }).to.throw();
      expect(function () { _.defaults({}, undefined); }).to.throw();
    });

    it('should preserve object properties when defaults is empty', function () {
      var result = _.defaults({ a: 'a' }, {});
      expect(result).to.deep.equal({ a: 'a' });
    });

    it('should preserve object properties when defaults is defined', function () {
      var result = _.defaults({ a: 'a' }, { a: 'b' });
      expect(result).to.deep.equal({ a: 'a' });
    });

    it('should set default properties on object when it is not current set', function () {
      var result = _.defaults({ a: 'a' }, { b: 'b' });
      expect(result).to.deep.equal({ a: 'a', b: 'b' });
    });

    it('should set default properties on object and respect the ones defined', function () {
      var result = _.defaults({ a: 'a' }, { a: 'x', b: 'b' });
      expect(result).to.deep.equal({ a: 'a', b: 'b' });
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

  describe('#every()', function () {
    it('should exist', function () {
      expect(_).to.respondTo('every');
    });

    it('reject invalid arguments', function () {
      expect(function () { _.every(); }).to.throw();
      expect(function () { _.every(''); }).to.throw();
      expect(function () { _.every(1); }).to.throw();
      expect(function () { _.every(false); }).to.throw();
      expect(function () { _.every(undefined); }).to.throw();
      expect(function () { _.every(null); }).to.throw();
    });

    it('should execute predicate for each item on array collection', function () {
      _.every(arrayCollection, function () { spy(); return true; });
      expect(spy.callCount).to.equal(arrayCollection.length);
      spy.reset();
    });

    it('should execute predicate for each item on object collection', function () {
      _.every(objectCollection, function () { spy(); return true; });
      expect(spy.callCount).to.equal(Object.keys(objectCollection).length);
      spy.reset();
    });

    it('should execute predicate with correct list params on array collection', function () {
      _.every(arrayCollection, function (item, index, list) { spy(item, index, list); return true; });
      expect(spy.calledWith(1, 0, arrayCollection)).to.equal(true);
      expect(spy.calledWith(2, 1, arrayCollection)).to.equal(true);
      expect(spy.calledWith(3, 2, arrayCollection)).to.equal(true);
      expect(spy.calledWith(4, 3, arrayCollection)).to.equal(true);
      spy.reset();
    });

    it('should execute predicate with correct list params on object collection', function () {
      _.every(objectCollection, function (item, index, list) { spy(item, index, list); return true; });
      expect(spy.calledWith(1, 'item1', objectCollection)).to.equal(true);
      expect(spy.calledWith(2, 'item2', objectCollection)).to.equal(true);
      expect(spy.calledWith(3, 'item3', objectCollection)).to.equal(true);
      expect(spy.calledWith(4, 'item4', objectCollection)).to.equal(true);
      spy.reset();
    });

    it('should return true if all values passes the predicate truth test on array collection', function () {
      expect(_.every([2, 4, 6], predicate2)).to.equal(true);
      expect(_.every([12, 14, 16], predicate1)).to.equal(true);
    });

    it('should return false if any value does not pass the predicate truth test on array collection', function () {
      expect(_.every([1, 4, 6], predicate2)).to.equal(false);
      expect(_.every([0, 14, 16], predicate1)).to.equal(false);
    });

    it('should return true if all values passes the predicate truth test on object collection', function () {
      expect(_.every({ a: 2, b: 4, c: 6 }, predicate2)).to.equal(true);
      expect(_.every({ a: 12, b: 23, c: 21 }, predicate1)).to.equal(true);
    });

    it('should return false if all values does not pass the predicate truth test on object collection', function () {
      expect(_.every({ a: 2, b: 3, c: 4 }, predicate2)).to.equal(false);
      expect(_.every({ a: 21, b: 22, c: 0 }, predicate1)).to.equal(false);
    });
  });

  describe('#some()', function () {
    it('should exist', function () {
      expect(_).to.respondTo('some');
    });

    it('reject invalid arguments', function () {
      expect(function () { _.some(); }).to.throw();
      expect(function () { _.some(''); }).to.throw();
      expect(function () { _.some(1); }).to.throw();
      expect(function () { _.some(false); }).to.throw();
      expect(function () { _.some(undefined); }).to.throw();
      expect(function () { _.some(null); }).to.throw();
    });

    it('should execute predicate for each item on array collection', function () {
      _.some(arrayCollection, function (item) { spy(); return item === 1; });
      expect(spy.callCount).to.equal(1);
      spy.reset();
    });

    it('should execute predicate for each item on object collection', function () {
      _.some(objectCollection, function (item) { spy(); return item === 1; });
      expect(spy.callCount).to.equal(1);
      spy.reset();
    });

    it('should execute predicate with correct list params on array collection', function () {
      _.some(arrayCollection, function (item, index, list) { spy(item, index, list); return item === 1; });
      expect(spy.calledWith(1, 0, arrayCollection)).to.equal(true);
      spy.reset();
    });

    it('should execute predicate with correct list params on object collection', function () {
      _.some(objectCollection, function (item, index, list) { spy(item, index, list); return item === 1; });
      expect(spy.calledWith(1, 'item1', objectCollection)).to.equal(true);
      spy.reset();
    });

    it('should return true if at least one value passes the predicate truth test on array collection', function () {
      expect(_.some([2, 1, 3], predicate2)).to.equal(true);
      expect(_.some([1, 2, 16], predicate1)).to.equal(true);
    });

    it('should return false if any value does not pass the predicate truth test on array collection', function () {
      expect(_.some([1, 3, 5], predicate2)).to.equal(false);
      expect(_.some([0, 1, 2], predicate1)).to.equal(false);
    });

    it('should return true if at least one value passes the predicate truth test on object collection', function () {
      expect(_.some({ a: 1, b: 2, c: 3 }, predicate2)).to.equal(true);
      expect(_.some({ a: 1, b: 23, c: 2 }, predicate1)).to.equal(true);
    });

    it('should return false if any value does not pass the predicate truth test on object collection', function () {
      expect(_.some({ a: 1, b: 3, c: 5 }, predicate2)).to.equal(false);
      expect(_.some({ a: 1, b: 2, c: 0 }, predicate1)).to.equal(false);
    });
  });

  describe('#shuffle()', function () {
    it('should exist', function () {
      expect(_).to.respondTo('shuffle');
    });

    it('should reject invalid arguments', function () {
      expect(function () { _.shuffle(); }).to.throw();
      expect(function () { _.shuffle(''); }).to.throw();
      expect(function () { _.shuffle(1); }).to.throw();
      expect(function () { _.shuffle(false); }).to.throw();
      expect(function () { _.shuffle(null); }).to.throw();
      expect(function () { _.shuffle(undefined); }).to.throw();
      expect(function () { _.shuffle({}); }).to.throw();
    });

    it('should return a copy of the original array', function () {
      var originalArray = [1, 2, 3, 4, 5];
      var shuffledArray = _.shuffle(originalArray);
      expect(shuffledArray).to.be.an('array');
      expect(shuffledArray.length).to.equal(originalArray.length);
      expect(shuffledArray).to.not.equal(originalArray);
    });
  });
});

describe('Functions', function () {
  describe('#once()', function () {
    it('should exist', function () {
      expect(_).to.respondTo('once');
    });

    it('should reject invalid arguments', function () {
      expect(function () { _.once(); }).to.throw();
      expect(function () { _.once('string'); }).to.throw();
      expect(function () { _.once(1); }).to.throw();
      expect(function () { _.once(false); }).to.throw();
      expect(function () { _.once(null); }).to.throw();
      expect(function () { _.once(undefined); }).to.throw();
      expect(function () { _.once([]); }).to.throw();
      expect(function () { _.once({}); }).to.throw();
    });

    it('should invoke the given function', function () {
      var onceFn = _.once(spy);
      onceFn();
      expect(spy.called).to.equal(true);
      spy.reset();
    });

    it('should invoke the given function only once', function () {
      var onceFn = _.once(spy);
      onceFn();
      onceFn();
      expect(spy.callCount).to.equal(1);
      spy.reset();
    });

    it('should handle passing arguments', function () {
      var onceFn = _.once(spy);
      onceFn(1, 0, 1);
      expect(spy.calledWith(1, 0, 1)).to.equal(true);
      spy.reset();
    });
  });

  describe('#memoize()', function () {
    var sum = function (a, b) {
      return a + b;
    };

    var identity = function (a) {
      return a;
    };

    it('should exist', function () {
      expect(_).to.respondTo('memoize');
    });

    it('should reject invalid arguments', function () {
      expect(function () { _.memoize(); }).to.throw();
      expect(function () { _.memoize(''); }).to.throw();
      expect(function () { _.memoize(1); }).to.throw();
      expect(function () { _.memoize(false); }).to.throw();
      expect(function () { _.memoize(null); }).to.throw();
      expect(function () { _.memoize(undefined); }).to.throw();
      expect(function () { _.memoize([]); }).to.throw();
      expect(function () { _.memoize({}); }).to.throw();
    });

    it('should return a function', function () {
      var memo = _.memoize(function () {});
      expect(memo).to.be.a('function');
    });

    it('should return a memoized version of given function', function () {
      var memo = _.memoize(spy);
      memo();
      expect(spy.called).to.equal(true);
      spy.reset();
    });

    it('should add a cache object property on returned function', function () {
      var memo = _.memoize(function () {});
      expect(memo.cache).to.be.an('object');
    });

    it('should memoize function with single argument', function () {
      var memo = _.memoize(identity);
      expect(memo(1)).to.equal(1);
    });

    it('should memoize function with multiple arguments', function () {
      var memo = _.memoize(sum);
      expect(memo(1, 2)).to.equal(3);
    });

    it('should cache the return value if not cached already for single argument', function () {
      var spy = sinon.spy(identity);
      var memo = _.memoize(spy);

      expect(memo(1)).to.equal(1);
      expect(spy.callCount).to.equal(1);
      expect(memo.cache).to.have.any.keys('1');
      expect(memo.cache['1']).to.equal(1);

      expect(memo(1)).to.equal(1);
      expect(memo(1)).to.equal(1);
      expect(memo(1)).to.equal(1);
      expect(spy.callCount).to.equal(1);
    });

    it('should cache the return value if not cached already for multiple arguments', function () {
      var spy = sinon.spy(sum);
      var memo = _.memoize(spy);

      expect(memo(1, 2)).to.equal(3);
      expect(spy.callCount).to.equal(1);
      expect(memo.cache).to.have.any.keys('1, 2');
      expect(memo.cache['1, 2']).to.equal(3);

      expect(memo(1, 2)).to.equal(3);
      expect(memo(1, 2)).to.equal(3);
      expect(memo(1, 2)).to.equal(3);
      expect(spy.callCount).to.equal(1);
    });

    it('should cache correctly value given complex arguments', function () {
      var complexFunction = function (a, b, fn, obj) {
        return [a, b, fn(), obj];
      };

      var spy = sinon.spy(complexFunction);
      var memo = _.memoize(spy);

      // first complex expectation
      var firstExpectedArgs = [undefined, true, function () { return 1; }, { a: 'a', b: 'b'}];
      var firstExpectedResult = [undefined, true, 1, { a: 'a', b: 'b' }];
      var firstExpectedHashIdentifier = 'undefined, true, function () { return 1; }, {"a":"a","b":"b"}';

      var firstExpectation = memo(firstExpectedArgs[0], firstExpectedArgs[1], firstExpectedArgs[2], firstExpectedArgs[3]);
      memo(firstExpectedArgs[0], firstExpectedArgs[1], firstExpectedArgs[2], firstExpectedArgs[3]);
      memo(firstExpectedArgs[0], firstExpectedArgs[1], firstExpectedArgs[2], firstExpectedArgs[3]);

      expect(firstExpectation).to.deep.equal(firstExpectedResult);
      expect(memo.cache[firstExpectedHashIdentifier]).to.deep.equal(firstExpectedResult);
      expect(spy.callCount).to.equal(1);

      spy.reset();

      // second complex expectation
      var fn = function () { console.log(101); };

      var secondExpectedArgs = [[1,2,3], null, function () { return 1; }, { a: 'a', 'b': fn }];
      var secondExpectedResult = [[1,2,3], null, 1, { a: 'a', 'b': fn }];
      var secondExpectedHashIdentifier = '[1,2,3], null, function () { return 1; }, {"a":"a","b":"function () { console.log(101); }"}';

      var secondExpectation = memo(secondExpectedArgs[0], secondExpectedArgs[1], secondExpectedArgs[2], secondExpectedArgs[3]);
      memo(secondExpectedArgs[0], secondExpectedArgs[1], secondExpectedArgs[2], secondExpectedArgs[3]);
      memo(secondExpectedArgs[0], secondExpectedArgs[1], secondExpectedArgs[2], secondExpectedArgs[3]);

      expect(secondExpectation).to.deep.equal(secondExpectedResult);
      expect(memo.cache[secondExpectedHashIdentifier]).to.deep.equal(secondExpectedResult);
      expect(spy.callCount).to.equal(1);

      spy.reset();
    });
  });

  describe('#delay()', function () {
    it('should exist', function () {
      expect(_).to.respondTo('delay');
    });

    it('should handle invalid callback function argument', function () {
      expect(function () { _.delay(); }).to.throw();
      expect(function () { _.delay(''); }).to.throw();
      expect(function () { _.delay(1); }).to.throw();
      expect(function () { _.delay(false); }).to.throw();
      expect(function () { _.delay([]); }).to.throw();
      expect(function () { _.delay({}); }).to.throw();
      expect(function () { _.delay(null); }).to.throw();
      expect(function () { _.delay(undefined); }).to.throw();
    });

    it('should handle invalid wait time argument', function () {
      var callback = function () {};
      expect(function () { _.delay(callback); }).to.throw();
      expect(function () { _.delay(callback, ''); }).to.throw();
      expect(function () { _.delay(callback, false); }).to.throw();
      expect(function () { _.delay(callback, []); }).to.throw();
      expect(function () { _.delay(callback, {}); }).to.throw();
      expect(function () { _.delay(callback, null); }).to.throw();
      expect(function () { _.delay(callback, undefined); }).to.throw();
    });

    it('should invoke the callback fuction respecting given delay time', function () {
      var clock = sinon.useFakeTimers();
      _.delay(spy, 100);
      expect(spy.called).to.equal(false);
      clock.tick(100);
      expect(spy.called).to.equal(true);
      clock.restore();
      spy.reset();
    });

    it('should accept single optional argument that will be passed to callback function', function () {
      var clock = sinon.useFakeTimers();
      _.delay(spy, 101, 'test');
      clock.tick(101);
      expect(spy.calledWith('test')).to.equal(true);
      clock.restore();
      spy.reset();
    });

    it('should accept multiple optional arguments that will be passed to callback function', function () {
      var clock = sinon.useFakeTimers();
      _.delay(spy, 101, 'test', 1, '0', 1);
      clock.tick(101);
      expect(spy.calledWith('test', 1, '0', 1)).to.equal(true);
      clock.restore();
      spy.reset();
    });
  });
});
