const get = require('lodash.get');
const { VALID_STATS, DEFAULT_STATS } = require('../config/stats');

const parseArray = (value) => (value || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const getPeriod = (input) => {
  const MAX_PERIOD_DATE = 365;
  const value = parseInt(input, 10);
  return Math.min(value, MAX_PERIOD_DATE);
};

const getRepositories = (input, currentRepo) => (input ? parseArray(input) : [currentRepo]);

const getPrId = (github) => get(github, 'context.payload.pull_request.node_id');

const getStats = (input) => {
  const statsList = parseArray(input).filter((s) => VALID_STATS.includes(s));
  return statsList.length > 0 ? statsList : DEFAULT_STATS;
};

module.exports = ({ core, github, currentRepo }) => {
  const githubToken = core.getInput('githubToken');
  const personalToken = core.getInput('token') || githubToken;

  return {
    currentRepo,
    githubToken,
    personalToken,
    pullRequestId: getPrId(github),
    org: core.getInput('organization'),
    repos: getRepositories(core.getInput('repositories'), currentRepo),
    sortBy: core.getInput('sortBy') || core.getInput('sort-by'),
    stats: getStats(core.getInput('stats')),
    publishAs: core.getInput('publishAs') || core.getInput('publish-as'),
    periodLength: getPeriod(core.getInput('period')),
    displayCharts: core.getBooleanInput('charts'),
    disableLinks: core.getBooleanInput('disableLinks') || core.getBooleanInput('disable-links'),
    limit: parseInt(core.getInput('limit'), 10),
    excludeStr: core.getInput('exclude'),
    telemetry: core.getBooleanInput('telemetry'),
    webhook: core.getInput('webhook'),
    slack: {
      webhook: core.getInput('slackWebhook') || core.getInput('slack-webhook'),
      channel: core.getInput('slackChannel') || core.getInput('slack-channel'),
    },
    teams: {
      webhook: core.getInput('teamsWebhook') || core.getInput('teams-webhook'),
    },
  };
};
