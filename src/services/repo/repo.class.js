/* eslint-disable no-unused-vars */

const github = require('../../common/githubHelper');
const R = require('ramda');

class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find () {
    const repos = [
      {name: 'qa-test-repo', owner: 'z-hirschtritt'},
      {name: 'fake-repo', owner: 'z-hirschtritt'},
      {name: 'now-cli', owner: 'zeit'},
      {name: 'hyper', owner: 'zeit'},
      {name: 'next.js', owner: 'zeit'},
      {name: 'serve', owner: 'zeit'},
      {name: 'micro', owner: 'zeit'},
    ];

    const releases = await Promise.all(repos.map((repo) => {
      return github.getMasterReleases(repo.name, repo.owner);
    }));

    return {
      data: releases.map((releaseList, index) => {
        return {
          id: index,
          repoName: repos[index].name,
          releases: releaseList
        };
      })
    };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
