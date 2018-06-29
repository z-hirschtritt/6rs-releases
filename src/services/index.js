const releaseDiff = require('./release-diff/release-diff.service.js');
const repo = require('./repo/repo.service.js');
const release = require('./release/release.service.js');
const jira = require('./jira/jira.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(releaseDiff);
  app.configure(release);
  app.configure(repo);
  app.configure(jira);
};
