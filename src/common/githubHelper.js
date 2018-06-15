'use srict';

const octokit = require('@octokit/rest')();

const config = require('../../config/default.js');

octokit.authenticate({
  type: 'token',
  token: config.githubAuthSecret,
});

const getLatestRelease = async (repo, owner) => {
  const release = await octokit.repos.getLatestRelease({owner, repo});

  return {
    name: release.data.name,
    tag_name: release.data.tag_name,
    url: release.data.url,
    published_at: release.data.published_at,
  };
};

const getMasterReleases = async (repo, owner) => {
  const releases = await octokit.repos.getReleases({owner, repo});

  return releases.data
    .filter((release) => {
      if (!/[a-u]|[w-z]/i.test(release.tag_name)) return release;
    })
    .map((release) => {
      return {
        id: release.id,
        name: release.name,
        url: release.url,
        tag_name: release.tag_name,
        published_at: release.published_at
      };
    })
    .slice(0, 5);
};

module.exports = {
  getLatestRelease,
  getMasterReleases
};
