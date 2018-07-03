/* eslint-disable no-unused-vars */
const Jira = require('../../common/jiraHelper');
const errors = require('@feathersjs/errors');

class Service {
  constructor (options) {
    this.options = options || {};
  }

  setup(app){
    this.app = app;
  }

  async find (params) {
    if (params.query.ticket) {
      const { ticket } = params.query;

      const jira = new Jira(this.app);
      let data = await jira.getJiraTicket(
        ticket,
        'customfield_10500,' +
        'status.name,' +
        'description,' +
        'summary,' +
        'key'
      ).catch(err => err);

      return {
        id: data.id,
        ticket: data.key,
        self: data.self,
        summary: data.summary,
        description: data.fields.description,
        releaseNotes: data.fields.customfield_10500,
      };
    } else {
      return new errors.BadRequest('Need to provide ticket in query');
    }
  }

}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;


// release notes: 'customfield_10500'
// status: 'status.name'
// description: 'description'
// summary: 'summary'
// ticket: 'key'
