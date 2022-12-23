const { t } = require('../../../i18n');
const postSummary = require('../index');

const CONTENT = 'CONTENT';

describe('Interactors | .postSummary', () => {
  const debug = jest.fn();
  const error = jest.fn();
  const write = jest.fn();
  const addRaw = jest.fn();

  const core = {
    debug,
    error,
    summary: {
      addRaw,
    },
  };

  const defaultOptions = {
    core,
    content: CONTENT,
  };

  beforeEach(() => {
    debug.mockClear();
    error.mockClear();
    write.mockClear().mockResolvedValue(true);
    addRaw.mockClear().mockReturnValue({ write });
  });

  it('writes summary to action', async () => {
    await postSummary(defaultOptions);

    expect(addRaw).toHaveBeenCalledTimes(1);
    expect(addRaw).toHaveBeenCalledWith(`\n${CONTENT}`, true);
    expect(write).toHaveBeenCalledTimes(1);
    expect(write).toHaveBeenCalledWith();
  });

  it('debugs starts and and', async () => {
    await postSummary(defaultOptions);

    expect(debug).toHaveBeenCalledTimes(2);
    expect(debug).toHaveBeenCalledWith(
      t('integrations.summary.logs.posting', { content: CONTENT }),
    );
    expect(debug).toHaveBeenCalledWith(
      t('integrations.summary.logs.success'),
    );
  });

  it('logs error when write fails', async () => {
    const e = new Error('Oops!... I did it again');
    write.mockRejectedValue(e);

    await postSummary(defaultOptions);

    expect(debug).toHaveBeenCalledTimes(1);
    expect(error).toHaveBeenCalledTimes(1);
    expect(error).toHaveBeenCalledWith(
      t('integrations.summary.errors.writeFailed', { error: e }),
    );
  });
});
