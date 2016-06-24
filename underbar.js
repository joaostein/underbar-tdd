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

// _.reduce(list, iteratee, [memo], [context])
//
// Also known as inject and foldl, reduce boils down a list of values into a single value.
// Memo is the initial state of the reduction, and each successive step of it should be
// returned by iteratee. The iteratee is passed four arguments: the memo, then the value
// and index (or key) of the iteration, and finally a reference to the entire list.
//
// If no memo is passed to the initial invocation of reduce, the iteratee is not invoked
// on the first element of the list. The first element is instead passed as the memo in
// the invocation of the iteratee on the next element in the list.
//
// var sum = _.reduce([1, 2, 3], function(memo, num){ return memo + num; }, 0);
// => 6

exports.reduce = function (list, iteratee, memo) {
  var copiedList = list.slice();

  if (typeof memo === 'undefined') {
    memo = copiedList.shift();
  }

  this.each(copiedList, function (item, index) {
    memo = iteratee(memo, item, index, list);
  });

  return memo;
};

// _.contains(list, value)
//
// Returns true if the value is present in the list.
//
// _.contains([1, 2, 3], 3);
// => true

exports.contains = function (list, value) {
  if (typeof list !== 'object' || list === null) {
    throw new Error('Invalid argument');
  }

  var found = false;

  this.each(list, function (item, index) {
    if (item === value) {
      found = true;
    }
  });

  return found;
};

// _.every(list, [predicate], [context])
//
// Returns true if all of the values in the list pass the predicate truth test.

// _.every([2, 4, 5], function(num) { return num % 2 == 0; });
// => false

exports.every = function (collection, predicate) {
  if (typeof collection !== 'object' || collection === null) {
    throw new Error('Invalid argument');
  }

  var test;

  this.each(collection, function (item, index, list) {
    if (typeof test !== undefined && test === false) {
      return;
    }

    test = predicate(item, index, list) ? true : false;
  });

  return test;
};

// _.some(list, [predicate])
//
// Returns true if any of the values in the list pass the predicate truth test.

// _.some([null, 0, 'yes', false]);
// => true

exports.some = function (collection, predicate) {
  if (typeof collection !== 'object' || collection === null) {
    throw new Error('Invalid Argument');
  }

  var test;

  this.each(collection, function (item, index, list) {
    if (test) {
      return;
    }

    test = predicate(item, index, list) ? true : false;
  });

  return test;
};

// _.extend(destination, *sources)
//
// Copy all of the properties in the source objects over to the destination object,
// and return the destination object. It's in-order, so the last source will
// override properties of the same name in previous arguments.

// _.extend({name: 'moe'}, {age: 50});
// => {name: 'moe', age: 50}

exports.extend = function () {
  var args = Array.prototype.slice.call(arguments);

  var destination = args[0];
  var sources = args.slice(1);

  validateArgument(destination);

  this.each(sources, function (item) {
    if (item !== undefined) {
      validateArgument(item);
    }
  });

  var self = this;

  this.each(sources, function (item) {
    self.each(item, addProperty);
  });

  function addProperty (value, index) {
    destination[index] = value;
  }

  function validateArgument (item) {
    if (typeof item !== 'object' || Array.isArray(item) || item === null) {
      throw new Error('Invalid argument');
    }
  }

  return destination;
};

// _.defaults(object, defaults)
//
// Fill in undefined properties in object with the first value present in
// the following list of defaults objects.

// var iceCream = {flavor: "chocolate"};
// _.defaults(iceCream, {flavor: "vanilla", sprinkles: "lots"});
// => {flavor: "chocolate", sprinkles: "lots"}

exports.defaults = function (sourceObj, defaultsObj) {
  validateArgument(sourceObj);
  validateArgument(defaultsObj);

  this.each(defaultsObj, function (item, key, collection) {
    if (!sourceObj[key]) {
      sourceObj[key] = defaultsObj[key];
    }
  });

  return sourceObj;

  function validateArgument (param) {
    if (typeof param !== 'object' || Array.isArray(param) || param === null) {
      throw new Error('Invalid argument');
    }
  }
};
