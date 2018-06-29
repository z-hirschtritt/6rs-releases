// Initializes the `jira` service on path `/jira`
const createService = require('./jira.class.js');
const hooks = require('./jira.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/jira', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('jira');

  service.hooks(hooks);
};
