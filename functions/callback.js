const axios = require('axios');
const querystring = require('querystring');
const {
  client_id,
  client_secret,
  redirect_uri,
  base_uri,
} = require('./config');

exports.handler = async (event, context) => {
  const { code, state } = event.queryStringParameters || null;
  const storedState = event.headers.cookie
    ? event.headers.cookie.split(';')[0].split('=')[1]
    : null;

  if (state === null || state !== storedState) {
    return {
      statusCode: 302,
      headers: {
        Location: `${base_uri}/#${querystring.stringify({ error: 'state_mismatch' })}`,
        'Cache-Control': 'no-cache',
      },
    };
  } else {
    const authOptions = {
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      params: {
        code,
        redirect_uri,
        grant_type: 'authorization_code',
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${new Buffer.from(
          `${client_id}:${client_secret}`
        ).toString('base64')}`,
      },
    };

    return axios(authOptions)
      .then((response) => {
        const { access_token, refresh_token } = response.data;
        return {
          statusCode: 302,
          headers: {
            Location: `${base_uri}/#${querystring.stringify({
              access_token,
              refresh_token,
            })}`,
            'Cache-Control': 'no-cache',
          },
        };
      })
      .catch((error) => {
        console.error(error);
        return {
          statusCode: 302,
          headers: {
            Location: `${base_uri}/#${querystring.stringify({ error: 'invalid_token' })}`,
            'Cache-Control': 'no-cache',
          },
        };
      });
  }
};
