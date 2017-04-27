const express = require('express')
const User = require('../db/models/User')
const authHelpers = require('../helpers/auth')

const router = express.Router()

router.post('/register', (req, res, next) => {
  const userData = req.body
  if (userData.password !== userData.passwordConfirmation) {
    return next(new Error('passwords do not match'))
  }
  const returnObject = {}
  return User.createUser(userData)
    .then((users) => {
      returnObject.user = users[0].id
      return authHelpers.encodeToken(users[0])
    })
    .then((token) => {
      returnObject.status = 'success'
      returnObject.token = token
      res.status(200).json(returnObject)
    })
    .catch(err => next(err))
})

router.post('/login', (req, res, next) => {
  const {email, password} = req.body
  const returnObject = {}
  User.getUserByEmail(email)
    .then((dbUser) => {
      returnObject.id = dbUser.id
      if (!dbUser) next(new Error('invalid credentials'))
      authHelpers.comparePasswords(password, dbUser.password)
      return authHelpers.encodeToken(dbUser)
    })
    .then((token) => {
      returnObject.status = 'success'
      returnObject.token = token
      res.status(200).json(returnObject)
    })
    .catch(err => next(err))
})

router.get('/user', authHelpers.protect, (req, res, next) => {
  res.status(200).json({
    status: 'success'
  })
})

module.exports = router
