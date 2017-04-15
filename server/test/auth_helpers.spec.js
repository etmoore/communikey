/* eslint-disable no-undef, no-unused-expressions, handle-callback-err */
const chai = require('chai')
const should = chai.should()
const authHelpers = require('../helpers/auth')

describe('auth helpers', () => {
  describe('encodeToken()', () => {
    it('should return a token', (done) => {
      const token = authHelpers.encodeToken({id: 1})
      token.should.exist
      token.should.be.a('string')
      done()
    })
  })

  describe('decodeToken()', () => {
    it('should return a payload', (done) => {
      const token = authHelpers.encodeToken({id: 1})
      authHelpers.decodeToken(token, (err, res) => {
        should.not.exist(err)
        res.sub.should.eql(1)
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
  })
})
