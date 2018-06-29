/* eslint-disable no-unused-vars */
const Jira = require('../../common/jiraHelper');

class Service {
  constructor (options) {
    this.options = options || {};
  }

  setup(app){
    this.app = app;
  }

  async find (params) {
    const jira = new Jira(this.app);
    let data = await jira.getJiraTicket(
      params.query.ticket,
      'customfield_10500' +
      'status.name' +
      'description' +
      'summary' +
      'key'
    );

    return {
      id: data.id,
      ticket: data.key,
      self: data.self,
      summary: data.summary,
      description: data.fields.description,
      releaseNotes: data.fields.customfield_10500,
    };
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
