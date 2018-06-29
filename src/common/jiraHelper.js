const JiraApi = require('jira-client');

module.exports = class Jira {
  constructor(app) {
    this.app = app;

    this.jira = new JiraApi({
      protocol: 'https',
      host: '6river.atlassian.net',
      username: this.app.get('atlassianUserId'),
      password: this.app.get('atlassianApiKey'),
      apiVersion: '2',
      strictSSL: true,
    });
  }

  async getJiraTicket(ticket, fields = '') {
    return await this.jira.findIssue(ticket,'',fields);
  }

  async getAllJiraInfo(tickets = []) {
    const allTickets = tickets.map((ticket) => this._getSingleTicketInfo(ticket));
    return await Promise.all(allTickets);
  }

  async _getSingleTicketInfo(ticket = '') {
    try {
      const resolvedTicket = await this.getJiraTicket(ticket);
      return {
        ticketId: resolvedTicket.key,
        summary: resolvedTicket.fields.summary,
        releaseNotes: resolvedTicket.fields.customfield_10900,
      };
    } catch (err) {
      return {
        ticketId: ticket,
        summary: `Could not find information for "${ticket}"`,
        releaseNotes: `Could not find information for "${ticket}"`,
      };
    }
  }
};
