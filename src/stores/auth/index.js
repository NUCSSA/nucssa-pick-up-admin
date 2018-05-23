import { observable, action, reaction } from 'mobx'
import routingStore from '../routing'
import { webAuth } from 'src/util/auth0'
import _ from 'lodash'
import {removeAuthResult, setAuthResult, getAuthResult} from 'src/util/cookies'
import {getExpiresAt} from 'src/util/cookies'


class AuthStore {
  @observable isProcessingAuth = true
  @observable error = null
  @observable authResult = null

  constructor() {
    const authResult = getAuthResult()
    // FIXME handle expiration
    // const expiresAt = getExpiresAt()
    if(!_.isNil(authResult)) {
      this.setAuthResult(authResult)
    }

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

    // setTimeout(this.handleExpiration, new Date().getTime() > expiresAt)
  }

  @action setAuthResult(authResult) {
    this.authResult = authResult
    this.isProcessingAuth = false
  }

  @action handleExpiration() {
    self.error = 'Token Expired, please login again'
    self.authResult = null
    removeAuthResult()
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
