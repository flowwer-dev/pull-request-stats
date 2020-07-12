const parseUser = require('./parse-user');

module.exports = (data = {}, pullOwnerId) => {
  const user = parseUser(data.user);
  const isOwnPull = user.id === pullOwnerId;

  return {
    id: data.id,
    createdAt: new Date(data.created_at),
    user,
    isOwnPull
  };
};
