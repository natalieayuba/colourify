const querystring = require('querystring');
const crypto = require('crypto');
const { client_id, redirect_uri, env } = require('./config');

const generateRandomString = (length) =>
  crypto.randomBytes(60).toString('hex').slice(0, length);

const stateKey = 'spotify_auth_state';

exports.handler = async (event, context) => {
  const state = generateRandomString(16);
  const cookieString = env === 'development' ? '' : '; Secure; HttpOnly';
  const stateCookie = `${stateKey}=${state}${cookieString}`;
  const scope = 'user-read-private user-read-email user-top-read';

  return {
    statusCode: 302,
    headers: {
      Location: `https://accounts.spotify.com/authorize?${querystring.stringify(
        {
          response_type: 'code',
          client_id,
          scope,
          redirect_uri,
          state,
        }
      )}`,
      'Set-Cookie': stateCookie,
      'Cache-Control': 'no-cache',
    },
  };
};
