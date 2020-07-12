const parseUser = require('./parse-user');

module.exports = (data = {}, pullOwnerId) => {
  const user = parseUser(data.user);
  const isOwnPull = user.id === pullOwnerId;

  return {
    id: data.id,
    state: data.state,
    submittedAt: new Date(data.submitted_at),
    user,
    isOwnPull
  };
};
