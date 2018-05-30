// Initializes the `releaseDiff` service on path `/release-diffs`
const createService = require('./release-diff.class.js');
const hooks = require('./release-diff.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/release-diffs', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('release-diffs');

  service.hooks(hooks);
};
