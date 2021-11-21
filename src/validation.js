const VALID_EVENT_NAMES = ['pull_request', 'pull_request_target'];

const validateEnv = (github) => {
  const { eventName } = github.context;
  for (let validEvent of VALID_EVENT_NAMES) {
    if(eventName === validEvent) return;
  }
  const error = `This action runs only in one of the following events "${VALID_EVENT_NAMES.join()}". Change the property "on" of your workflow file from "${eventName}" one of "${VALID_EVENT_NAME.join()}".`;
  throw new Error(error);
};

module.exports = {
  validateEnv,
};
