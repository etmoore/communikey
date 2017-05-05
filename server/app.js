const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const asksRoutes = require('./routes/asks')
const usersRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')

const app = express()

require('dotenv').config()

// CORS Configuration
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/v1/asks', asksRoutes)
app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/auth', authRoutes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  err.message = 'Not found'
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  console.log(err.message);
  res.json({
    status: 'error',
    error: err.message
  })
})

module.exports = app
