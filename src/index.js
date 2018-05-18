import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { Router } from 'react-router'
import createHashHistory from 'history/createHashHistory'
import { syncHistoryWithStore } from 'mobx-react-router'

const hashHistory = createHashHistory()

import stores from './stores'
import App from './containers'

const history = syncHistoryWithStore(hashHistory, stores.routingStore)

ReactDOM.render(
  <Provider {...stores}>
    <Router history={history}>
      <App/>
    </Router>
  </Provider>
  , document.getElementById('aa3c5543-edfc-4ed6-9538-1f9d4a7c946a'))
