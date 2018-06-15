/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = app;
  }

  async find(params) {
    const {
      from = 1,
      to = 40
    } = params.query;

    // get all releases between version numbers given as defined on release model
    return await this.app.service('releases').find({
      query: {
        tag: {
          $gte: Math.min(...[from, to]),
          $lte: Math.max(...[from, to]),
        }
      }
    });
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
