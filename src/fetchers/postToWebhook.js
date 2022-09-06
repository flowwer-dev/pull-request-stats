const axios = require('axios');

module.exports = ({
  payload,
  webhook,
}) => axios({
  method: 'post',
  url: webhook,
  data: payload,
});
