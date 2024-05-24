const querystring = require('querystring');
const crypto = require('crypto');
const { client_id, redirect_uri } = require('./config');

const generateRandomString = (length) =>
  crypto.randomBytes(60).toString('hex').slice(0, length);

exports.handler = async (event, context) => {
  const state = generateRandomString(16);
  const stateKey = 'spotify_auth_state';
  const cookieString = process.env.NETLIFY_DEV ? '' : '; Secure; HttpOnly';
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
