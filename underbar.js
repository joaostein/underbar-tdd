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

// _.first([5, 4, 3, 2, 1]);
// => 5

exports.first = function (array, length) {
  if (!Array.isArray(array)) {
    throw new Error('Invalid Parameter');
  }

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

// _.last([5, 4, 3, 2, 1]);
// => 1

exports.last = function (array, length) {
  if (!Array.isArray(array)) {
    throw new Error('Invalid Parameter');
  }

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

// var evens = _.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
// => [2, 4, 6]

exports.filter = function (collection, predicate) {
  var filteredCollection = [];

  this.each(collection, function (item) {
    if (predicate(item)) {
      filteredCollection.push(item);
    }
  });

  return filteredCollection;
};

// _.reject(list, predicate, [context])
// Returns the values in list without the elements that the truth test (predicate)
// passes. The opposite of filter.

// var odds = _.reject([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
// => [1, 3, 5]

exports.reject = function (collection, predicate) {
  var filteredCollection = [];

  this.each(collection, function (item) {
    if (!predicate(item)) {
      filteredCollection.push(item);
    }
  });

  return filteredCollection;
};
