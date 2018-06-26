'use strict';

const parseAndFlattenData = function() {
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
    find: [parseAndFlattenData()],
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
