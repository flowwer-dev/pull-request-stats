const core = require('@actions/core');
const github = require('@actions/github');
const execute = require('./execute');

const parseBoolean = (value) => value === 'true';

const parseArray = (value) => value.split(',');

const getPeriodLength = () => {
  const MAX_PERIOD_DATE = 365;
  const value = parseInt(core.getInput('period'), 10);
  return Math.min(value, MAX_PERIOD_DATE);
};

const getRepositories = (currentRepo) => {
  const input = core.getInput('repositories');
  return input ? parseArray(input) : [currentRepo];
};

const getParams = () => {
  const { sha, repository: currentRepo } = github;

  const githubToken = core.getInput('token') || github.token;

  const periodLength = getPeriodLength();

  const repositories = getRepositories(currentRepo);

  const displayCharts = parseBoolean(core.getInput('charts'));

  const sortBy = core.getInput('sort-by');

  return {
    githubToken,
    periodLength,
    repositories,
    displayCharts,
    sortBy,
    currentRepo,
    sha
  };
};

const run = async () => {
  try {
    await execute(getParams());
    core.info('Executed successfully');
  } catch (error) {
    core.setFailed(error.message);
  }
};

run();
