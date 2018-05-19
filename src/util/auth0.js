import auth0 from 'auth0-js'

const CLIENT_ID = '45TpYQlEIF4mWfewmoA6AM3BsWedhkrq'
const DOMAIN = 'nucssa.auth0.com'
const CALLBACK_DOMAIN = window.location.href + '#/callback'

export const webAuth = new auth0.WebAuth({
  domain: DOMAIN,
  clientID: CLIENT_ID,
  redirectUri: CALLBACK_DOMAIN,
  audience: 'https://nucssa.auth0.com/api/v2/',
  responseType: 'token id_token',
  scope: 'openid profile read:messages',

})