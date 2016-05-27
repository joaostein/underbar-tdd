'use strict';


// _.identity(value)
//
// Returns the same value that is used as the argument. In math: `f(x) = x`
//
// This function looks useless, but is used throughout Underscore as a default iteratee.
//
// var stooge = {name: 'moe'};
// stooge === _.identity(stooge);
// => true

exports.identity = function (value) {
  if (arguments.length === 0) {
    throw new Error('Invalid Argument');
  }

  return value;
};

// _.first(array, [n])
//
// Returns the first element of an array. Passing n will return the first n elements of the array.
//
// _.first([5, 4, 3, 2, 1]);
// => 5

exports.first = function (array, length) {
  if (!Array.isArray(array)) {
    throw new Error('Invalid Parameter');
  }

  array = array.slice();

  if (length > 1) {
    var elements = [];

    length = length > array.length ? array.length : length;

    for (var i = 0; i < length; i++) {
      elements.push(array.shift());
    }

    return elements;
  }

  return array.shift();
};

// _.last(array, [n])
//
// Returns the last element of an array. Passing n will return the last n elements of the array.
//
// _.last([5, 4, 3, 2, 1]);
// => 1

exports.last = function (array, length) {
  if (!Array.isArray(array)) {
    throw new Error('Invalid Parameter');
  }

  array = array.slice();

  if (length > 1) {
    var elements = [];

    length = length > array.length ? array.length : length;

    for (var i = 0; i < length; i++) {
      elements.push(array.pop());
    }

    return elements;
  }

  return array.pop();
};

// _.each(list, iteratee, [context])
//
// Iterates over a list of elements, yielding each in turn to an iteratee function.
// The iteratee is bound to the context object, if one is passed. Each invocation
// of iteratee is called with three arguments: (element, index, list). If list is a
// JavaScript object, iteratee's arguments will be (value, key, list).
// Returns the list for chaining.
//
// _.each([1, 2, 3], alert);
// => alerts each number in turn...
// _.each({one: 1, two: 2, three: 3}, alert);
// => alerts each number value in turn...

exports.each = function (list, cb) {
  if (Array.isArray(list)) {
    for (var i = 0; i < list.length; i++) {
      cb(list[i], i, list);
    }
  } else if (typeof list === 'object') {
    for (var key in list) {
      cb(list[key], key, list);
    }
  }
};

// _.indexOf(array, value)
//
// Returns the index at which value can be found in the array, or -1 if value
// is not present in the array.
//
// _.indexOf([1, 2, 3], 2);
// => 1

exports.indexOf = function (array, value) {
  if (!Array.isArray(array)) {
    throw new Error('Collection must be an array.');
  }

  var position = -1;

  for (var i = 0; i < array.length; i++) {
    if (array[i] === value) {
      position = i;
      break;
    }
  }

  return position;
};

// _.filter(collection, predicate)
//
// Looks through each value in the list, returning an array of all the values
// that pass a truth test (predicate).
//
// var evens = _.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
// => [2, 4, 6]

exports.filter = function (collection, predicate) {
  return this._filter(collection, predicate, 'filter');
};

// _.reject(list, predicate)
//
// Returns the values in list without the elements that the truth test (predicate)
// passes. The opposite of filter.
//
// var odds = _.reject([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
// => [1, 3, 5]

exports.reject = function (collection, predicate) {
  return this._filter(collection, predicate, 'reject');
};


exports._filter = function (collection, predicate, operation) {
  var filteredCollection = [];
  var test;

  this.each(collection, function (item) {
    test = predicate(item);
    test = (operation === 'filter') ? test : !test;

    if (test) {
      filteredCollection.push(item);
    }
  });

  return filteredCollection;
};

// _.uniq(array)
//
// Produces a duplicate-free version of the array, using === to test object equality.
// In particular only the first occurence of each value is kept.
//
// _.uniq([1, 2, 1, 4, 1, 3]);
// => [1, 2, 4, 3]

exports.uniq = function (collection) {
  if (!Array.isArray(collection)) {
    throw new Error('Collection must be an array.');
  }

  var uniq = [];

  this.each(collection, function (item, index, collection) {
    if (uniq.indexOf(item) === -1) {
      uniq.push(item);
    }
  });

  return uniq;
};

// _.map(list, iteratee)
//
// Produces a new array of values by mapping each value in list through
// a transformation function (iteratee). The iteratee is passed three arguments:
// the value, then the index (or key) of the iteration, and finally a reference
// to the entire list.
//
// _.map([1, 2, 3], function(num){ return num * 3; });
// => [3, 6, 9]
//
// _.map({one: 1, two: 2, three: 3}, function(num, key){ return num * 3; });
// => [3, 6, 9]
//
// _.map([[1, 2], [3, 4]], _.first);
// => [1, 3]

exports.map = function (collection, iteratee) {
  var mappedArray = [];

  this.each(collection, function (item, index, list) {
    mappedArray.push(iteratee(item, index, list));
  });

  return mappedArray;
};

// _.pluck(list, propertyName)
//
// A convenient version of what is perhaps the most common use-case for map:
// extracting a list of property values.
//
// var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
// _.pluck(stooges, 'name');
// => ["moe", "larry", "curly"]

exports.pluck = function (collection, propertyName) {
  var pluckedArray = [];

  this.each(collection, function (item, index, list) {
    pluckedArray.push(item[propertyName]);
  });

  return pluckedArray;
};
