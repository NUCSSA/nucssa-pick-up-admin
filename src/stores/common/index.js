import { observable, action, reaction } from 'mobx'


// FIXME use cookie and put them into util folder
const setAuth = (authResult) => {
  // Set the time that the access token will expire at
  let expiresAt = JSON.stringify(
    authResult.expiresIn * 1000 + new Date().getTime()
  )
  localStorage.setItem('auth_result', authResult.accessToken)
  localStorage.setItem('access_token', authResult.accessToken)
  localStorage.setItem('id_token', authResult.idToken)
  localStorage.setItem('expires_at', expiresAt)
}

const removeAuth = () => {
  localStorage.removeItem('auth_result')
  localStorage.removeItem('access_token')
  localStorage.removeItem('id_token')
  localStorage.removeItem('expires_at')
}

class CommonStore {
    @observable authResult = localStorage.getItem('auth_result')

    constructor() {
      reaction(
        () => self.authResult, authResult => {
          if(authResult) {
            self.authResult = authResult
            setAuth(authResult)
          } else {
            self.authResult = null
            removeAuth()

          }
        }
      )
    }

    @action setAuthResult(authResult) {
      self.authResult = authResult
      setAuth(authResult)
    }

}

const common = new CommonStore()

export default common
