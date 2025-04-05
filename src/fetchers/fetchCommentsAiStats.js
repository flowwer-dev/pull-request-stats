const { OpenAI } = require('openai');

const MODEL = 'gpt-4o';
const PROMPT = `
You are an expert software reviewer and writing analyst. You will receive an array of comments. For each comment, produce the following metrics:

1. **cognitiveEffortScore (0–5)**  
   - 0 = No effort (extremely short, no insight)
   - 5 = Very high effort (detailed, logical structure, code examples, references)
   Criteria to consider:
   - Logical structure (cause-effect reasoning, conditionals, clarity)
   - Technical/code thinking (mentions code behavior, edge cases, code examples)
   - References or teaching (links to docs, concept explanations)
   - Length & clarity (longer, well-structured comments generally reflect deeper thought)
   - Vocabulary sophistication (precise technical language vs. vague/general statements)
   - Reviewer engagement (attempts to understand/improve the author's code)

2. **estimatedWritingTime (in minutes)**  
   - Integer value that reflects approximate time spent thinking and writing.
   - Factors include comment length, technical complexity, code snippets, references, and clarity/polish.

3. **isConstructive (boolean)**  
   - Whether the comment is constructive and helpful to the author.
   - Comments that are not actionable or helpful should be set to false (eg. LGTM, Ok, Nice catch, etc.)

Finally, produce a single JSON object with the following structure:

\`\`\`json
{
  "results": [
    {
      "id": "<commentId>",
      "cognitiveEffortScore": <number from 0 to 5>,
      "estimatedWritingTime": <integer in minutes>,
      "isConstructive": <boolean>
    },
    ...
  ]
}
\`\`\`
`;

const safeParseInt = (value) => {
  const parsed = parseInt(value, 10);
  return Number.isNaN(parsed) ? null : parsed;
};

const safeParseBoolean = (value) => {
  const parsed = String(value).toLowerCase();
  return parsed ? parsed === 'true' : null;
};

const parseResponse = (response) => {
  const json = JSON.parse(response);
  return (json?.results || []).map((result) => {
    const isConstructive = safeParseBoolean(result.isConstructive);
    return {
      id: result.id,
      cognitiveEffortScore: safeParseInt(result.cognitiveEffortScore),
      estimatedWritingTime: safeParseInt(result.estimatedWritingTime),
      constructiveComments: isConstructive ? 1 : 0,
      isConstructive,
    };
  });
};

module.exports = async ({
  core,
  comments,
  openaiApiKey,
}) => {
  core.debug(`Fetching AI stats for ${comments.length} comments`);
  core.debug(`Sample comments: ${JSON.stringify(comments.slice(0, 10), null, 2)}`);

  const client = new OpenAI({ apiKey: openaiApiKey });
  const input = `Get the metrics for the following comments:

  <Comments>
  ${JSON.stringify(comments)}
  </Comments>

  Return the results as a JSON object.
  `;

  const response = await client.responses.create({
    model: MODEL,
    instructions: PROMPT,
    input,
    text: { format: { type: 'json_object' } },
  });

  core.debug(`OpenAI response: ${JSON.stringify(response, null, 2)}`);

  return parseResponse(response.output_text);
};
