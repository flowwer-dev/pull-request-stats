const { AI_STATS } = require('../../../config/stats');
const { pullRequests: pulls } = require('../../../../tests/mocks');
const { fetchCommentsAiStats } = require('../../../fetchers');
const getCommentsAIStats = require('../index');

jest.mock('../../../fetchers', () => ({
  fetchCommentsAiStats: jest.fn(),
}));

const OPENAI_RESPONSE = [
  {
    id: 'comment1',
    cognitiveEffortScore: 5,
    estimatedWritingTime: 15,
    isConstructive: true,
  },
  {
    id: 'comment2',
    cognitiveEffortScore: 3,
    estimatedWritingTime: 10,
    isConstructive: false,
  },
  {
    id: 'comment3',
    cognitiveEffortScore: 1,
    estimatedWritingTime: 5,
    isConstructive: true,
  },
];

describe('Interactors | .getCommentsAIStats', () => {
  const debug = jest.fn();
  const setFailed = jest.fn();
  const setOutput = jest.fn();

  const defaultInputs = {
    core: {
      debug,
      setFailed,
      setOutput,
    },
    pulls,
    openaiApiKey: 'test',
    mainStats: AI_STATS,
  };

  fetchCommentsAiStats.mockResolvedValue(OPENAI_RESPONSE);

  beforeEach(() => {
    fetchCommentsAiStats.mockClear();
  });

  it('returns empty object if no AI stats are needed', async () => {
    const response = await getCommentsAIStats({ ...defaultInputs, mainStats: [] });
    expect(response).toEqual({});
  });

  it('sets failed if no openaiApiKey is provided', async () => {
    const response = await getCommentsAIStats({ ...defaultInputs, openaiApiKey: null });
    expect(setFailed).toHaveBeenCalled();
    expect(response).toEqual({});
  });

  it('returns empty object if no comments are found', async () => {
    const response = await getCommentsAIStats({ ...defaultInputs, pulls: [] });
    expect(response).toEqual({});
    expect(fetchCommentsAiStats).not.toHaveBeenCalled();
  });

  it('returns stats by comment when AI stats are needed', async () => {
    const response = await getCommentsAIStats({ ...defaultInputs });
    const expectedStructure = {
      id: expect.any(String),
      cognitiveEffortScore: expect.any(Number),
      estimatedWritingTime: expect.any(Number),
      isConstructive: expect.any(Boolean),
    };

    expect(response).toEqual(expect.objectContaining({
      comment1: expectedStructure,
      comment2: expectedStructure,
      comment3: expectedStructure,
    }));

    expect(setOutput).toHaveBeenCalledWith('aiCommentsStats', expect.any(Array));
  });
});
