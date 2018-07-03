/* eslint-disable no-unused-vars */

const Github = require('../../common/githubHelper');
const errors = require('@feathersjs/errors');

class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    if (Object.keys(params.query).length > 0) {
      if (params.query.tag) {
        const { repoName, owner, tag } = params.query;

        const github = new Github({repoName, owner});
        const release = await github.getReleaseByTag(tag);

        return {
          data: [{
            id: 0,
            repoName: repoName,
            owner: owner,
            releases: [release]
          }]
        };
      } else if (params.query.repoName && params.query.owner) {
        const { repoName, owner } = params.query;
        const github = new Github({repoName, owner});

        return await github.getMasterReleases();
      } else {
        return new errors.BadRequest('Need to include repoName, owner', {
          query: params.query
        });
      }

    }

    const repos = [
      {repoName: 'qa-test-repo', owner: 'z-hirschtritt'},
      {repoName: 'fake-repo', owner: 'z-hirschtritt'},
      {repoName: 'now-cli', owner: 'zeit'},
      {repoName: 'hyper', owner: 'zeit'},
      {repoName: 'next.js', owner: 'zeit'},
      {repoName: 'serve', owner: 'zeit'},
      {repoName: 'blueshell', owner: '6RiverSystems'},
    ];

    const releases = await Promise.all(repos.map((repo) => {
      const github = new Github(repo);
      return github.getMasterReleases();
    }));

    return {
      data: releases.map((releaseList, index) => {
        return {
          id: index,
          repoName: repos[index].repoName,
          owner: repos[index].owner,
          releases: releaseList,
        };
      })
    };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
