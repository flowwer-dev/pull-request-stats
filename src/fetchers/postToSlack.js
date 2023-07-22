const axios = require('axios').default;

module.exports = ({
  webhook,
  message,
  channel,
  iconUrl,
  username,
}) => axios({
  method: 'post',
  url: webhook,
  data: {
    channel,
    username,
    blocks: message.blocks,
    icon_url: iconUrl,
  },
});
