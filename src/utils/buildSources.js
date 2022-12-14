const { t } = require('../i18n');
const { getRepoComponents } = require('./repos');

module.exports = ({
  org,
  repos,
  buildGithubLink,
  limit = 3,
}) => {
  const buildLink = (path) => {
    const [owner, name] = getRepoComponents(path);
    const description = name || owner;
    return buildGithubLink({ description, path });
  };

  const buildLimitedSources = (sources) => {
    const firsts = sources.slice(0, limit - 1);
    const othersCount = sources.length - firsts.length;
    return t('table.sources.andOthers', {
      firsts: firsts.map(buildLink).join(t('table.sources.separator')),
      count: othersCount,
    });
  };

  const buildFullList = (sources) => {
    const firsts = sources.slice(0, sources.length - 1);
    const last = sources[sources.length - 1];
    return t('table.sources.fullList', {
      firsts: firsts.map(buildLink).join(t('table.sources.separator')),
      last: buildLink(last),
    });
  };

  const getSources = () => {
    if (org) return buildLink(org);
    if (repos.length === 1) return buildLink(repos[0]);
    if (repos.length > limit) return buildLimitedSources(repos);
    return buildFullList(repos);
  };

  return getSources();
};
