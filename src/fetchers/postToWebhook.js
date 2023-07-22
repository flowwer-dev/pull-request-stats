const axios = require('axios').default;

module.exports = ({
  payload,
  webhook,
}) => axios({
  method: 'post',
  url: webhook,
  data: payload,
});
