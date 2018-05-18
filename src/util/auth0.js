import auth0 from 'auth0-js'

// FIXME move constants into env vars
const CLIENT_ID = '45TpYQlEIF4mWfewmoA6AM3BsWedhkrq'
const DOMAIN = 'nucssa.auth0.com'

export const webAuth = new auth0.WebAuth({
  domain: DOMAIN,
  clientID: CLIENT_ID,
  redirectUri: 'http://localhost:8081/#/callback',
  audience: 'https://nucssa.auth0.com/userinfo',
  responseType: 'token id_token',
  scope: 'openid profile read:messages',
})