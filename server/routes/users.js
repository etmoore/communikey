const express = require('express')
const _ = require('lodash')
const User = require('../db/models/User')
const authHelpers = require('../helpers/auth')

const router = express.Router()

router.get('/:id', authHelpers.requireLogin, (req, res, next) => {
  const requestedUserID = parseInt(req.params.id, 10)
  const authToken = req.headers.authorization.split(' ')[1]
  const currentUserID = authHelpers.decodeTokenSync(authToken).sub
  User.getUserByID(requestedUserID)
    .then((user) => {
      if (!user) {
        const error = new Error('User not found')
        error.status = 404
        return next(error)
      }
      if (requestedUserID !== currentUserID) {
        const error = new Error('You are not authorized to access this page')
        error.status = 403
        return next(error)
      }
      user = _.pick(user, ['firstName', 'lastName', 'email'])
      return res.json(user)
    })
    .catch(err => next(err))
})

module.exports = router
