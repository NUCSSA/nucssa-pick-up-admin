import { observable, action, reaction } from 'mobx'

class CommonStore {
    @observable appName = 'Pickup'
    @observable token = window.localStorage.getItem('jwt')


    constructor() {
      reaction(
        () => this.token,
        token => {
          if(token) {
            window.localStorage.setItem('jwt', token)
            let expiresAt = JSON.stringify((token.expiresIn * 1000) + new Date().getTime())
            localStorage.setItem('access_token', token.accessToken)
            localStorage.setItem('id_token', token.idToken)
            localStorage.setItem('expires_at', expiresAt)
          } else {
            window.localStorage.removeItem('jwt')
            window.localStorage.removeItem('access_token')
            window.localStorage.removeItem('id_token')
            window.localStorage.removeItem('expires_at')

          }
        }
      )
    }

    @action setToken(token) {
      this.token = token
    }

}

const common = new CommonStore()

export default common