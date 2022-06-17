const get = require('lodash.get');
const core = require('@actions/core');
const github = require('@actions/github');
const execute = require('./execute');

const parseArray = (value) => value.split(',');

const getPeriod = () => {
  const MAX_PERIOD_DATE = 365;
  const value = parseInt(core.getInput('period'), 10);
  return Math.min(value, MAX_PERIOD_DATE);
};

const getRepositories = (currentRepo) => {
  const input = core.getInput('repositories');
  return input ? parseArray(input) : [currentRepo];
};

const getPrId = () => get(github, 'context.payload.pull_request.node_id');

const getParams = () => {
  const { payload } = github.context || {};
  const { repository } = payload || {};
  const currentRepo = repository.full_name;

  return {
    currentRepo,
    org: core.getInput('organization'),
    repos: getRepositories(currentRepo),
    sortBy: core.getInput('sort-by'),
    publishAs: core.getInput('publish-as'),
    githubToken: core.getInput('github-token'),
    personalToken: core.getInput('token'),
    periodLength: getPeriod(),
    displayCharts: core.getBooleanInput('charts'),
    disableLinks: core.getBooleanInput('disable-links'),
    pullRequestId: getPrId(),
    limit: parseInt(core.getInput('limit'), 10),
    telemetry: core.getBooleanInput('telemetry'),
    slack: {
      webhook: core.getInput('slack-webhook'),
      channel: core.getInput('slack-channel'),
    },
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
