'use strict';

const parseJson = function() {
  return function(context) {
    context.result.data = context.result.data.map((data) => {
      data = Object.assign(data, JSON.parse(data.data));
      delete data.data;
      return data;
    });
    return context;
  };
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [parseJson()],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
