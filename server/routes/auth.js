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

module.exports = router
