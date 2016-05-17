'use strict';

exports.identify = function (value) {
  if (arguments.length === 0) {
    throw new Error('Invalid Argument');
  }

  return value;
};