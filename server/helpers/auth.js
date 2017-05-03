const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const moment = require('moment')
const knex = require('../db/knex')

function comparePasswords (userPw, dbPw) {
  if (bcrypt.compareSync(userPw, dbPw)) return true
  else throw new Error('invalid credentials')
}

function hashPassword (pw) {
  const saltRounds = 10
  return bcrypt.hashSync(pw, saltRounds)
}

function encodeToken (user, exp) {
  const payload = {
    sub: user.id,
    exp: exp || moment().add(14, 'days').unix()
  }
  return jwt.sign(payload, process.env.TOKEN_SECRET)
}

function decodeToken (token, callback) {
  return jwt.verify(token, process.env.TOKEN_SECRET, callback)
}

function decodeTokenSync (token) {
  return jwt.verify(token, process.env.TOKEN_SECRET)
}

function requireLogin (req, res, next) {
  if (!req.headers.authorization) {
    const error = new Error('Please log in')
    error.status = 401
    return next(error)
  }
  const header = req.headers.authorization.split(' ')
  const token = header[1]
  decodeToken(token, (err, payload) => {
    if (err) {
      err.status = 401
      next(err)
    } else {
      const userID = parseInt(payload.sub, 10)
      // confirm that the user is still in the DB
      knex('users').where('id', userID).first()
        .then(user => next())
        .catch(err => next(err))
    }
  })
}

module.exports = {
  comparePasswords,
  hashPassword,
  encodeToken,
  decodeToken,
  decodeTokenSync,
  requireLogin
}
