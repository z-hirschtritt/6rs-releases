const assert = require('assert');
const app = require('../../src/app');

describe('\'jira\' service', () => {
  it('registered the service', () => {
    const service = app.service('jira');

    assert.ok(service, 'Registered the service');
  });
});
