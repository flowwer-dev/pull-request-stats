const buildHeaders = require('../buildHeaders');

const EXPECTED_HEADERS = [
  'header1',
  'header2',
  'header3',
  'header4',
];

const headers = EXPECTED_HEADERS.map((text) => ({ text }));

describe('Interactors | .postTeamsMessage | .buildHeaders', () => {
  const result = buildHeaders(headers);
  const texts = (result?.columns || []).map((column) => column?.items?.[0]?.text);

  it('includes headers structure', () => {
    expect(result).toEqual(
      expect.objectContaining({
        type: 'ColumnSet',
        padding: 'Small',
        horizontalAlignment: 'Left',
        style: 'emphasis',
        spacing: 'Small',
      }),
    );
  });

  EXPECTED_HEADERS.forEach((expectedHeader) => {
    it(`includes the header "${expectedHeader}"`, () => {
      expect(texts).toContain(expectedHeader);
    });
  });
});
