'use strict'

const express = require('express')
const path = require('path')
// const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const flash = require('connect-flash')

const port = process.env.PORT || 3000


const auth_route = require('./services/auth')

const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const publicPath = path.join(__dirname, '..', 'src/assets')
app.use(express.static(publicPath))

app.use(flash())

app.use('/api/admin', auth_route)



app.get('*', (req, res) => {
  console.log('here')
  res.sendFile(path.join(publicPath, '/index.html'), function(err){
    if(err) {
      res.status(err.status).end()
    }
  })
})



app.listen(port)
