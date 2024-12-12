const core = require('@actions/core');
const github = require('@actions/github');
const execute = require('./execute');
const { parseInputs } = require('./parsers');
const { t } = require('./i18n');

const getParams = () => {
  const currentRepo = process.env.GITHUB_REPOSITORY;

  return parseInputs({
    core,
    github,
    currentRepo,
  });
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
