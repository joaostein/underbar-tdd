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