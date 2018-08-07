/* eslint-disable no-unused-vars */

const R = require('ramda');
class Service {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = app;
    this.releases = this.app.service('releases');
    this.repos = this.app.service('repos');
    this.jira = this.app.service('jira');
  }

  async create(data) {
    const { currentRelease } = data;
    let previousRelease;

    if (data.previousRelease) {
      previousRelease = data.previousRelease;
    } else {
      const latestRelease = await this.releases.find({
        query: {
          $limit: 1,
          $sort: {
            createdAt: -1
          }
        }
      });
      previousRelease = latestRelease.data[0];
    }

    const releaseDiff = await Promise.all(
      R.zip(currentRelease.versions, previousRelease.versions)
        .filter((releasePair) => {
          return (releasePair[0].tag_name !== releasePair[1].tag_name);
        })
        .map(async (releasePair) => {
          const allReleases = await this.repos.find({
            query: {
              repoName: releasePair[0].repo.repo,
              owner: releasePair[0].repo.owner
            }
          });
          return allReleases.filter((release) => {
            return (
              (new Date(release.published_at) <= new Date(releasePair[0].published_at)) &&
              (new Date(release.published_at) >= new Date(releasePair[1].published_at))
            );
          });
        })
    );

    // from all different releases within time frame, extract the jira tickets
    const extractedTickets = R.flatten(
      releaseDiff.map((releases) => {
        return releases.map(r => r.jiraTickets);
      })
    );

    // call to jira to grab detials on tickets
    const ticketDetails = await Promise.all(
      extractedTickets.map((ticket) => {
        return this.jira.find({
          query: {
            ticket
          }
        });
      })
    );

    return ticketDetails;
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
