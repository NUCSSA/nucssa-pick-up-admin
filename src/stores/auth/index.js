import { observable, action } from 'mobx'
import common from '../common'
import auth0 from 'auth0-js'

const webAuth = new auth0.WebAuth({
  domain: 'nucssa.auth0.com',
  clientID: '45TpYQlEIF4mWfewmoA6AM3BsWedhkrq',
  redirectUri: 'http://localhost:8081/callback',
  audience: 'https://nucssa.auth0.com/userinfo',
  responseType: 'token id_token',
  scope: 'openid',
})

class AuthStore {
    @observable inProgress = false
    @observable isAuthenticated = false
    @observable errors = undefined

    @action async login() {
      // this.inProgress = true
      // this.errors = undefined
      webAuth.authorize()
    }

    @action handleAuth() {
      webAuth.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          common.setToken(authResult)
          this.isAuthenticated = true
        } else if (err) {
          this.errors = err
          this.isAuthenticated = false
        }
      })
      this.inProgress = false
    }
    @action logout() {
      common.setToken(undefined)
      this.isAuthenticated = false
      return Promise.resolve()
    }

    // const handleAuthentication = (nextState) => {
    //     if (/access_token|id_token|error/.test(nextState.location.hash)) {
    //         webAuth.handleAuthentication()
    //     }
    // }
}
const auth = new AuthStore()

export default auth