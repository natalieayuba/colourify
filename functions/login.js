const { randomBytes } = require('node:crypto');
const { client_id, redirect_uri, env } = require('./config');

const generateRandomString = (length) =>
  randomBytes(60).toString('hex').slice(0, length);

const stateKey = 'spotify_auth_state';

exports.handler = async (event, context) => {
  const state = generateRandomString(16);
  const cookieString = env === 'development' ? '' : '; Secure; HttpOnly';
  const stateCookie = `${stateKey}=${state}${cookieString}`;
  const scope = 'user-read-private user-read-email user-top-read';
  const params = new URLSearchParams({
    response_type: 'code',
    client_id,
    scope,
    redirect_uri,
    state,
  });

  return {
    statusCode: 302,
    headers: {
      Location: `https://accounts.spotify.com/authorize?${params.toString()}`,
      'Set-Cookie': stateCookie,
      'Cache-Control': 'no-cache',
    },
  };
};
