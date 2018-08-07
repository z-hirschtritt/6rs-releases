const assert = require('assert');
const app = require('../../src/app');

describe('\'releaseDiff\' service', () => {
  it('registered the service', () => {
    const service = app.service('release-diffs');

    assert.ok(service, 'Registered the service');
  });
});
