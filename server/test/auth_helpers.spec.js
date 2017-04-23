/* eslint-disable no-undef, no-unused-expressions, handle-callback-err */
process.env.NODE_ENV = 'test'

const moment = require('moment')
const chai = require('chai')
const expect = chai.expect
const should = chai.should()
const authHelpers = require('../helpers/auth')

describe('auth helpers', () => {
  describe('encodeToken()', () => {
    it('should return a token', (done) => {
      const token = authHelpers.encodeToken({ id: 1 })
      token.should.exist
      token.should.be.a('string')
      done()
    })
  })

  describe('decodeToken()', () => {
    it('should return a payload', (done) => {
      const token = authHelpers.encodeToken({ id: 1 })
      authHelpers.decodeToken(token, (err, res) => {
        should.not.exist(err)
        res.sub.should.eql(1)
        done()
      })
    })
    it('should not accept an expired token', (done) => {
      const expiration = moment().subtract(1, 'day').unix()
      const token = authHelpers.encodeToken({ id: 1 }, expiration)
      authHelpers.decodeToken(token, (err, res) => {
        err.should.exist
        err.message.should.eql('jwt expired')
        done()
      })
    })
  })

  describe('hashPassword()', () => {
    it('should return a password hash', (done) => {
      const password = 'password123'
      const hash = authHelpers.hashPassword(password)
      hash.should.exist
      hash.should.be.a('string')
      done()
    })
  })

  describe('comparePasswords()', () => {
    it('should return true if the password matches the hash', (done) => {
      const password = 'password123'
      const hash = authHelpers.hashPassword(password)
      authHelpers.comparePasswords(password, hash).should.be.true
      done()
    })
    it('should throw an error if the password does not match', (done) => {
      const password = 'password123'
      const hash = authHelpers.hashPassword(password)
      try {
        authHelpers.comparePasswords('paswrd', hash)
      } catch (err) {
        err.should.exist
        err.message.should.eql('invalid credentials')
      }
      done()
    })
  })
})
