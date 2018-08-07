'use srict';

const octokit = require('@octokit/rest')();

const config = require('../../config/default.js');

octokit.authenticate({
  type: 'token',
  token: config.githubAuthSecret,
});

module.exports = class Github {
  constructor({owner, repoName}, github = octokit) {
    this.repoName = repoName;
    this.owner = owner;
    this.github = github;
  }

  get repo() {
    return {
      repo: this.repoName,
      owner: this.owner,
    };
  }

  async getReleaseByTag (tag) {
    const release = await this.github.repos.getReleaseByTag(Object.assign(this.repo, {tag}));

    return {
      id: release.data.id,
      name: release.data.name,
      url: release.data.url,
      tag_name: release.data.tag_name,
      published_at: release.data.published_at,
      jiraTickets: this._parseForJiraTickets(release.data.body),
    };
  }

  async getMasterReleases () {
    const releases = await this.github.repos.getReleases(this.repo);

    return releases.data
      .filter((release) => {
        if (!/[a-u]|[w-z]/i.test(release.tag_name)) return release;
      })
      .map((release) => {
        return {
          repo: this.repo,
          id: release.id,
          name: release.name,
          url: release.url,
          tag_name: release.tag_name,
          published_at: release.published_at,
          jiraTickets: this._parseForJiraTickets(release.body),
        };
      });
  }

  _parseForJiraTickets (body) {
    const regex = /[A-Z]{2,10}-\d+/gi;
    // const regex = /(TS)+/g;

    return [...new Set(body.match(regex))];
  }

};

// const getLatestRelease = async (repo, owner) => {
//   const release = await octokit.repos.getLatestRelease({owner, repo});

//   return {
//     name: release.data.name,
//     tag_name: release.data.tag_name,
//     url: release.data.url,
//     published_at: release.data.published_at,
//   };
// };

