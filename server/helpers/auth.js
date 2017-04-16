const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const moment = require('moment')

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
  jwt.verify(token, process.env.TOKEN_SECRET, callback)
}

module.exports = {
  comparePasswords,
  hashPassword,
  encodeToken,
  decodeToken
}
