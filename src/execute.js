const core = require('@actions/core');
const github = require('@actions/github');
const { t } = require('./i18n');
const { subtractDaysToDate } = require('./utils');
const { Telemetry } = require('./services');
const { fetchPullRequestById } = require('./fetchers');
const { getGithubApiUrl } = require('./config');
const {
  alreadyPublished,
  checkSponsorship,
  getPulls,
  getEntries,
  publish,
} = require('./interactors');

const run = async ({ inputs, octokit }) => {
  const pullRequest = inputs.pullRequestId
    ? await fetchPullRequestById(octokit, inputs.pullRequestId)
    : null;

  if (alreadyPublished(pullRequest)) {
    core.info('Skipping execution because stats are published already');
    return null;
  }

  const pulls = await getPulls({
    org: inputs.org,
    repos: inputs.repos,
    octokit: github.getOctokit(inputs.personalToken, { baseUrl: getGithubApiUrl() }),
    startDate: subtractDaysToDate(new Date(), inputs.periodLength),
  });
  core.info(`Found ${pulls.length} pull requests to analyze`);

  const entries = await getEntries({
    core,
    pulls,
    excludeStr: inputs.excludeStr,
    includeStr: inputs.includeStr,
    periodLength: inputs.periodLength,
  });
  core.debug(`Analyzed entries: ${entries.length}`);

  await publish({
    core,
    octokit,
    entries,
    pullRequest,
    inputs,
  });

  return {
    entries,
    pullRequest,
  };
};

module.exports = async (inputs) => {
  core.debug(`Inputs: ${JSON.stringify(inputs, null, 2)}`);

  const { githubToken, org, repos } = inputs;
  const octokit = github.getOctokit(githubToken, { baseUrl: getGithubApiUrl() });
  const isSponsor = await checkSponsorship({ octokit, org, repos });
  const telemetry = new Telemetry({ core, isSponsor, telemetry: inputs.telemetry });
  if (isSponsor) core.info(t('execution.logs.sponsors'));

  try {
    telemetry.start(inputs);
    const results = await run({
      octokit,
      inputs: { ...inputs, isSponsor },
    });
    telemetry.success(results);
    return results;
  } catch (error) {
    telemetry.error(error);
    throw error;
  }
};
