/**
 * A basic node.js script that performs the Authorization Code oAuth2 flow to
 * authenticate against a user's Spotify account.
 *
 * For more information, read:
 * https://developer.spotify.com/documentation/web-api/tutorials/code-flow
 *
 * For the official Spotify code example, view:
 * https://github.com/spotify/web-api-examples/blob/master/authorization/authorization_code/app.js
 */

const express = require('express');
const request = require('request');
const crypto = require('crypto');
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI || 'http://localhost:8888/callback';
const frontend_uri = process.env.FRONTEND_URI || 'http://localhost:3000';
const port = process.env.PORT || 8888;

/**
 * Generates a random string containing numbers and letters
 * @param  {length} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length) =>
  crypto.randomBytes(60).toString('hex').slice(0, length);

const stateKey = 'spotify_auth_state';

const app = express();

app
  .use(express.static(`${__dirname}../client/build`))
  .use(cors())
  .use(cookieParser());

app.get('/', function (req, res) {
  res.render(path.resolve(__dirname, '../client/build/index.html'));
});

/**
 * Requests authorisation from the user
 * @param req The request
 * @param res The response
 */
app.get('/login', (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  const scope = 'user-read-private user-read-email user-top-read';
  res.redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: 'code',
      client_id,
      scope,
      redirect_uri,
      state,
    })}`
  );
});

/**
 * Requests refresh and access tokens after checking the state parameter
 * @param req The request
 * @param res The response
 */
app.get('/callback', (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(`/#${querystring.stringify({ error: 'state_mismatch' })}`);
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
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
      json: true,
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const { access_token, refresh_token } = body;
        res.redirect(
          `${frontend_uri}/#${querystring.stringify({
            access_token,
            refresh_token,
          })}`
        );
      } else {
        res.redirect(`/#${querystring.stringify({ error: 'invalid_token' })}`);
      }
    });
  }
});

/**
 * Requests access token from refresh token
 * @param req The request
 * @param res The response
 */
app.get('/refresh_token', (req, res) => {
  const { refresh_token } = req.query;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(
        `${client_id}:${client_secret}`
      ).toString('base64')}`,
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token,
    },
    json: true,
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const { access_token, refresh_token } = body;
      res.send({
        access_token,
        refresh_token,
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
