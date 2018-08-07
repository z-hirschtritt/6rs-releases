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

const createNewReleaseTag = function() {
  return async function(context) {
    try {
      const latestRelease = await context.service.find({
        query: {
          $limit: 1,
          $sort: {
            createdAt: -1
          }
        }
      });
      let latestTag = parseInt(latestRelease.data[0].tag) || 0;
      context.data.tag = latestTag + 1;
    } catch (e) {
      context.data.tag = 1;
    }
    return context;
  };
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [createNewReleaseTag()],
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
