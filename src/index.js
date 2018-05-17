import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { Router } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import { syncHistoryWithStore } from 'mobx-react-router'

const browserHistory = createBrowserHistory()

import stores from './stores'
import App from './containers'

const history = syncHistoryWithStore(browserHistory, stores.routingStore)

ReactDOM.render(
  <Provider {...stores}>
    <Router history={history}>
      <App/>
    </Router>
  </Provider>
  , document.getElementById('aa3c5543-edfc-4ed6-9538-1f9d4a7c946a'))
