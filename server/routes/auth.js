const express = require('express')
const User = require('../db/models/User')
const authHelpers = require('../helpers/auth')

const router = express.Router()

router.post('/register', (req, res, next) => {
  const userData = req.body
  User.createUser(userData)
    .then(users => authHelpers.encodeToken(users[0]))
    .then((token) => {
      res.status(200).json({
        status: 'success',
        token
      })
    })
    .catch(err => next(err))
})

router.post('/login', (req, res, next) => {
  const {email, password} = req.body
  User.getUserByEmail(email)
    .then((dbUser) => {
      if (!dbUser) next(new Error('invalid credentials'))
      authHelpers.comparePasswords(password, dbUser.password)
      return authHelpers.encodeToken(dbUser)
    })
    .then((token) => {
      res.status(200).json({
        status: 'success',
        token: token
      })
    })
    .catch(err => next(err))
})

module.exports = router
