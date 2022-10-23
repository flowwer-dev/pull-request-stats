const get = require('lodash.get');
const core = require('@actions/core');
const github = require('@actions/github');
const execute = require('./execute');
const { t } = require('./i18n');

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
  const currentRepo = process.env.GITHUB_REPOSITORY;
  const githubToken = core.getInput('github-token');
  const personalToken = core.getInput('token') || githubToken;

  return {
    currentRepo,
    githubToken,
    personalToken,
    org: core.getInput('organization'),
    repos: getRepositories(currentRepo),
    sortBy: core.getInput('sort-by'),
    publishAs: core.getInput('publish-as'),
    periodLength: getPeriod(),
    displayCharts: core.getBooleanInput('charts'),
    disableLinks: core.getBooleanInput('disable-links'),
    pullRequestId: getPrId(),
    limit: parseInt(core.getInput('limit'), 10),
    telemetry: core.getBooleanInput('telemetry'),
    webhook: core.getInput('webhook'),
    slack: {
      webhook: core.getInput('slack-webhook'),
      channel: core.getInput('slack-channel'),
    },
    teams: {
      webhook: core.getInput('teams-webhook'),
    },
  };
};

const run = async () => {
  try {
    await execute(getParams());
    core.info(t('execution.logs.success'));
    core.info(t('execution.logs.news'));
  } catch (error) {
    core.debug(t('execution.errors.main', error));
    core.debug(error.stack);
    core.setFailed(error.message);
  }
};

run();
