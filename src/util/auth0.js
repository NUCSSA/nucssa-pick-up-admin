import auth0 from 'auth0-js'

const CLIENT_ID = '1MmJH24Smv2966Zfh6LjHY5S9nZK1LwB'
const DOMAIN = 'nucssa.auth0.com'
const CALLBACK_DOMAIN = window.location.href + '#/callback'

export const webAuth = new auth0.WebAuth({
  domain: DOMAIN,
  clientID: CLIENT_ID,
  redirectUri: CALLBACK_DOMAIN,
  audience: 'https://nucssa.pickup.com/api/',
  responseType: 'token id_token',
  scope: 'openid profile read:messages',

})