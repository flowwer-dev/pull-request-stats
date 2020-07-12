module.exports = (data = {}) => ({
  id: data.id,
  login: data.login,
  avatarUrl: data.avatar_url,
  url: data.html_url
});
