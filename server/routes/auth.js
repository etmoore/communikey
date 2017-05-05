const express = require('express')
const _ = require('lodash')
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
      returnObject.user = _.pick(users[0], ['firstName', 'lastName', 'id', 'email'])
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
      returnObject.user = _.pick(dbUser, ['firstName', 'lastName', 'id', 'email'])
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

module.exports = router
