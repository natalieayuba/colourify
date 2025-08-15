const axios = require('axios');
const {
  client_id,
  client_secret,
  redirect_uri,
  base_uri,
} = require('./config');

exports.handler = async (event, _) => {
  const { code, state } = event.queryStringParameters || null;
  const storedState = event.headers.cookie
    ? event.headers.cookie.split(';')[0].split('=')[1]
    : null;
  const params = new URLSearchParams({ error: 'state_mismatch' });

  if (state === null || state !== storedState) {
    return {
      statusCode: 302,
      headers: {
        Location: `${base_uri}/#${params.toString()}`,
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
        const params = new URLSearchParams({ access_token, refresh_token });
        return {
          statusCode: 302,
          headers: {
            Location: `${base_uri}/#${params.toString()}`,
            'Cache-Control': 'no-cache',
          },
        };
      })
      .catch((error) => {
        console.error(error);
        const params = new URLSearchParams({ error: 'invalid_token' });
        return {
          statusCode: 302,
          headers: {
            Location: `${base_uri}/#${params.toString()}`,
            'Cache-Control': 'no-cache',
          },
        };
      });
  }
};
