// Initializes the `repo` service on path `/repos`
const createService = require('./repo.class.js');
const hooks = require('./repo.hooks');

module.exports = function (app) {

  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/repos', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('repos');

  service.hooks(hooks);
};
