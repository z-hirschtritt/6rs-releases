/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = app;
  }

  async find(params) {
    const { from, to } = params.query;

    // get all releases between version numbers given as defined on release model
    const allreleasesBetween = await this.app.service('releases').find({
      query: {
        number: {
          $gte: Math.min(...[from, to]),
          $lte: Math.max(...[from, to]),
        }
      }
    });

    return allreleasesBetween;
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
