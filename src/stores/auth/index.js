import { observable, action, computed } from 'mobx'
import { getIdToken } from 'src/util/AuthService'
import commonStore from 'src/stores/common'
import auth0 from 'auth0-js'
import routingStore from '../routing'

// FIXME move constants into env vars
const CLIENT_ID = '45TpYQlEIF4mWfewmoA6AM3BsWedhkrq'
const DOMAIN = 'nucssa.auth0.com'

const webAuth = new auth0.WebAuth({
  domain: DOMAIN,
  clientID: CLIENT_ID,
  redirectUri: 'http://localhost:8081/callback',
  audience: 'https://nucssa.auth0.com/userinfo',
  responseType: 'token id_token',
  scope: 'openid profile read:messages',
})


class AuthStore {
    @observable isProcessingAuth = false
    @observable error = null

    @computed get isAuthenticated() {
      // Check whether the current time is past the
      // access token's expiry time
      const expiresAt = JSON.parse(localStorage.getItem('expires_at'))
      return new Date().getTime() < expiresAt
    }

    @action login() {
      webAuth.authorize((err) => {
        if (err) {
          self.error = err
          console.log(err)
        }
      })
    }

    @action handleAuthentication() {
      webAuth.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          commonStore.setAuthResult(authResult)
          routingStore.history.replace('/')
        } else if (err) {
          self.error = err
          console.log(err)
          routingStore.history.replace('/')
        }
      })
    }

    // FIXME use axios
    @action getPublicData() {
      const token = getIdToken()
      fetch( server + 'data', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'pikachu ' + token,
        },
      })
        .then( (res) => res.json() )
        .then( (res) => this.publicData = res.toString())
        .catch( (err) => this.publicData = err.toString())
    }

    @action getPrivateData() {
      const token = getIdToken()
      fetch( server + 'api/data', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'pikachu ' + token,
        },
      })
        .then( (res) => res.json() )
        .then( (res) => this.privateData = res.toString())
        .catch( (err) => this.privateData = err.toString())
    }

}
const self = new AuthStore()

export default self
