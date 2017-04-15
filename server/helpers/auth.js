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

function encodeToken (user) {
  const payload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: user.id
  }
  return jwt.sign(payload, process.env.TOKEN_SECRET)
}

function decodeToken (token, callback) {
  const payload = jwt.verify(token, process.env.TOKEN_SECRET)
  const now = moment().unix()
  if (now > payload.exp) callback(new Error('Token has expired'))
  else callback(null, payload)
}

module.exports = {
  comparePasswords,
  hashPassword,
  encodeToken,
  decodeToken
}
