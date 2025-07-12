const axios = require('axios');
const { client_id, client_secret } = require('./config');

exports.handler = async function (event, _) {
  const { refresh_token } = event.queryStringParameters;

  const authOptions = {
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(
        `${client_id}:${client_secret}`
      ).toString('base64')}`,
    },
    params: {
      grant_type: 'refresh_token',
      refresh_token,
    },
  };

  return axios(authOptions)
    .then((response) => {
      const { access_token, refresh_token } = response.data;
      return {
        statusCode: 200,
        body: JSON.stringify({
          access_token,
          refresh_token,
        }),
      };
    })
    .catch((error) => {
      return {
        statusCode: 500,
        body: JSON.stringify({ error }),
      };
    });
};
