const buildPayload = require('../buildPayload');

describe('Interactors | .postTeamsMessage | .buildPayload', () => {
  const body = 'BODY';

  it('wraps the body into a required structure', () => {
    const result = buildPayload(body);
    expect(result.type).toEqual('message');

    const wrappedBody = result?.attachments?.[0]?.content?.body;
    expect(wrappedBody).toEqual(body);
  });
});
