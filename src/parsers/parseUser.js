function parseUser(data = {}, team) {
  if (team) {
    return {
      id: team.id,
      url: team.url,
      login: team.login,
      avatarUrl: team.avatarUrl,
    };
  }

  return {
    id: data.databaseId,
    url: data.url,
    login: data.login,
    avatarUrl: data.avatarUrl,
  };
}

module.exports = parseUser;
