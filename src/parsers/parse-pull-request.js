const parseUser = require('./parse-user');

module.exports = (data = {}) => ({
  id: data.id,
  number: data.number,
  state: data.state,
  url: data.html_url,
  user: parseUser(data.user),
  createdAt: new Date(data.created_at),
  updatedAt: new Date(data.updated_at)
});
