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

const getSha = () => {
  const { eventName, payload, sha } = github.context || {};
  core.debug(`Event name: ${eventName}`);
  if (eventName === 'pull_request') {
    return payload.pull_request.head.sha;
  }
  return sha;
};

const getParams = () => {
  const { payload } = github.context || {};
  const { repository } = payload || {};
  const currentRepo = repository.full_name;

  return {
    currentRepo,
    githubToken: core.getInput('token'),
    sortBy: core.getInput('sort-by'),
    periodLength: getPeriodLength(),
    repositories: getRepositories(currentRepo),
    displayCharts: parseBoolean(core.getInput('charts')),
    sha: getSha()
  };
};

const run = async () => {
  try {
    await execute(getParams());
    core.info('Action successfully executed');
  } catch (error) {
    core.debug(`Execution failed with error: ${error.message}`);
    core.debug(error.stack);
    core.setFailed(error.message);
  }
};

run();
