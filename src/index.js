const core = require('@actions/core');
const github = require('@actions/github');
const execute = require('./execute');

const parseBoolean = (value) => value === 'true';

const parseArray = (value) => value.split(',');

// TODO: Validate "org" and "repos" input against a Personal Access Token
// TODO: Validate action not in pull request

const getPeriod = () => {
  const MAX_PERIOD_DATE = 365;
  const value = parseInt(core.getInput('period'), 10);
  return Math.min(value, MAX_PERIOD_DATE);
};

const getRepositories = (currentRepo) => {
  const input = core.getInput('repositories');
  return input ? parseArray(input) : [currentRepo];
};

const getPrId = () => {
  const { eventName, payload } = github.context;
  core.debug(`Event name: ${eventName}`);

  if (eventName !== 'pull_request') return null;
  return payload.pull_request.node_id;
};

const getParams = () => {
  const { payload } = github.context || {};
  const { repository } = payload || {};
  const currentRepo = repository.full_name;

  return {
    currentRepo,
    org: core.getInput('organization'),
    repos: getRepositories(currentRepo),
    sortBy: core.getInput('sort-by'),
    githubToken: core.getInput('token'),
    periodLength: getPeriod(),
    displayCharts: parseBoolean(core.getInput('charts')),
    disableLinks: parseBoolean(core.getInput('disable-links')),
    pullRequestId: getPrId()
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
