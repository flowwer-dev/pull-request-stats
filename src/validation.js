const VALID_EVENT_NAME = 'pull_request';

const validateEnv = (github) => {
  const { eventName } = github.context;
  if (eventName === VALID_EVENT_NAME) return;
  const error = `This action runs only in the "${VALID_EVENT_NAME}" event. Change the property "on" of your workflow file from "${eventName}" to "${VALID_EVENT_NAME}".`;
  throw new Error(error);
};

module.exports = {
  validateEnv,
};
