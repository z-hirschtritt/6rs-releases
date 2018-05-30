// Initializes the `release` service on path `/releases`
const createService = require('feathers-mongoose');
const createModel = require('../../models/release.model');
const hooks = require('./release.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/releases', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('releases');

  service.hooks(hooks);
};
