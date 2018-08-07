const assert = require('assert');
const app = require('../../src/app');

describe('\'release\' service', () => {
  it('registered the service', () => {
    const service = app.service('releases');

    assert.ok(service, 'Registered the service');
  });
});
