import { observable, action, reaction } from 'mobx'
// import  userStore from 'src/stores/user'
import routingStore from '../routing'
import { webAuth } from 'src/util/auth0'
import _ from 'lodash'
import {removeAuthResult, setAuthResult, getAuthResult} from 'src/util/cookies'
import {getExpiresAt} from 'src/util/cookies'
// import { checkTokenExpiration } from 'src/api/auth'


class AuthStore {
  @observable isProcessingAuth = true
  @observable error = null
  @observable authResult = null
  @observable isExpired = false

  constructor() {
    const authResult = getAuthResult()
    const expiresAt = getExpiresAt()
    if(!_.isNil(authResult) && !_.isNil(expiresAt)) {
      this.setAuthResult(authResult)
      this.setIsExpired(expiresAt)
    }

    // checkTokenExpiration()

    reaction(
      () => this.authResult,
      authResult => {
        if(authResult) {
          setAuthResult(authResult)
        } else {
          this.authResult = null
          removeAuthResult()
        }
      }
    )
  }

  @action setAuthResult(authResult) {
    this.authResult = authResult
    this.isProcessingAuth = false
  }

  @action setIsExpired(expiresAt) {
    this.isExpired = new Date().getTime() > expiresAt
    if(this.isExpired === true) {
      this.error = 'Token Expired, please login again'
      this.authResult = null
      removeAuthResult()
    }
  }

  @action removeAuthResult() {
    this.authResult = null
    removeAuthResult()
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
    routingStore.history.replace('/')
  }
}
const self = new AuthStore()

export default self
