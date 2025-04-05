const { fetchCommentsAiStats } = require('../../fetchers');

const CHUNK_SIZE = 100;

const processCommentsInChunks = async ({
  core,
  comments,
  openaiApiKey,
}) => {
  const chunks = [];
  for (let i = 0; i < comments.length; i += CHUNK_SIZE) {
    chunks.push(comments.slice(i, i + CHUNK_SIZE));
  }

  const results = await Promise.all(chunks.map((chunk) => {
    try {
      return fetchCommentsAiStats({
        core,
        openaiApiKey,
        comments: chunk,
      });
    } catch (e) {
      core.error(`Error fetching AI stats for comments chunk: ${e.message}`);
      return [];
    }
  }));

  const byId = results
    .flat()
    .reduce((acc, result) => {
      acc[result.id] = result;
      return acc;
    }, {});

  return byId;
};

module.exports = processCommentsInChunks;
