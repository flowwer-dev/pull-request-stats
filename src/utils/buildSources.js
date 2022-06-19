const { t } = require('../i18n');

module.exports = ({
  org,
  repos,
  buildGithubLink,
  limit = 3,
}) => {
  const buildLimitedSources = (sources) => {
    const firsts = sources.slice(0, limit - 1);
    const othersCount = sources.length - firsts.length;
    return t('table.sources.andOthers', {
      firsts: firsts.map(buildGithubLink).join(t('table.sources.separator')),
      count: othersCount,
    });
  };

  const buildFullList = (sources) => {
    const last = sources.pop();
    return t('table.sources.fullList', {
      firsts: sources.map(buildGithubLink).join(t('table.sources.separator')),
      last: buildGithubLink(last),
    });
  };

  const getSources = () => {
    if (org) return buildGithubLink(org);
    if (repos.length === 1) return buildGithubLink(repos);
    if (repos.length > limit) return buildLimitedSources(repos);
    return buildFullList(repos);
  };

  return getSources();
};
