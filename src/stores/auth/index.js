import { observable, action, reaction } from 'mobx'
// import  userStore from 'src/stores/user'
import routingStore from '../routing'
import { webAuth } from 'src/util/auth0'
import _ from 'lodash'
import {removeAuthResult, setAuthResult, getAuthResult} from 'src/util/cookies'

class AuthStore {
  @observable isProcessingAuth = true
  @observable error = null
  @observable authResult = null

  constructor() {
    const authResult = getAuthResult()
    if(!_.isNil(authResult)) {
      this.setAuthResult(authResult)
    } else {
      this.isProcessingAuth = false
    }
    reaction(
      () => this.authResult,
      authResult => {
        if(authResult) {
          setAuthResult(authResult)
        } else {
          removeAuthResult()
        }
      }
    )
  }

  @action setAuthResult(authResult) {
    this.authResult = authResult
    this.isProcessingAuth = false
  }

  @action removeAuthResult() {
    this.authResult = null
  }

  @action login() {
    webAuth.authorize()
  }

  @action handleAuthentication() {
    webAuth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        routingStore.history.replace('/')
        self.setAuthResult(authResult)
        // userStore.getUser()
      } else if (err) {
        self.error = err
        routingStore.history.replace('/')
      }
    })
  }

  @action logout() {
    self.removeAuthResult()
  }
  // @computed
  // get isAuthenticated() {
  //   // Check whether the current time is past the
  //   // access token's expiry time
  //   const expiresAt = JSON.stringify(
  //     this.authResult.expiresIn * 1000 + new Date().getTime()
  //   )
  //
  //   return self.currentTime < expiresAt
  // }
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
