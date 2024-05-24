require('dotenv').config();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const base_uri = process.env.URL;
const redirect_uri = `${base_uri}/.netlify/functions/callback`;

module.exports = {
  client_id,
  client_secret,
  base_uri,
  redirect_uri,
};
