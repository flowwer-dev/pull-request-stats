const { t } = require('../../../../i18n');
const buildHeaders = require('../buildHeaders');

const EXPECTED_HEADERS = [
  t('table.columns.username'),
  t('table.columns.timeToReview'),
  t('table.columns.totalReviews'),
  t('table.columns.totalComments'),
];

describe('Interactors | .postTeamsMessage | .buildHeaders', () => {
  const result = buildHeaders({ t });
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
