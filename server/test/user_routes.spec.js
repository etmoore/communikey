/* eslint-disable no-undef, no-unused-expressions, handle-callback-err */
process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const knex = require('../db/knex')
const User = require('../db/models/User')
const should = chai.should()
const authHelpers = require('../helpers/auth')
const specHelpers = require('./spec_helpers')
chai.use(chaiHttp)

describe('User Routes', function () {
  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
  })

  afterEach(() => {
    return knex.migrate.rollback()
  })

  describe('GET /api/v1/user/:id', () => {
    it('provides user data to authenticated user', (done) => {
      specHelpers.loginUser()
        .end((err, res) => {
          const authToken = res.body.token
          const userID = authHelpers.decodeTokenSync(authToken).sub
          chai.request(server)
            .get(`/api/v1/users/${userID}`)
            .set('authorization', `Bearer ${authToken}`)
            .end((err, res) => {
              should.not.exist(err)
              res.should.be.json
              res.status.should.eql(200)
              res.body.should.include.keys('firstName', 'lastName', 'email')
              res.body.should.not.include.keys('password')
              done()
            })
        })
    })
    it('returns 404 error if the user does not exist', (done) => {
      specHelpers.loginUser()
        .end((err, res) => {
          const authToken = res.body.token
          const userID = authHelpers.decodeTokenSync(authToken).sub
          chai.request(server)
            .get('/api/v1/users/0')
            .set('authorization', `Bearer ${authToken}`)
            .end((err, res) => {
              should.exist(err)
              res.should.be.json
              res.status.should.equal(404)
              res.body.status.should.equal('error')
              res.body.error.should.equal('User not found')
              done()
            })
        })
    })
    it('returns 401 error if the user provides no authentication', (done) => {
      specHelpers.loginUser()
        .end((err, res) => {
          const authToken = res.body.token
          const userID = authHelpers.decodeTokenSync(authToken).sub
          chai.request(server)
            .get(`/api/v1/users/${userID}`)
          // NOT setting authentication header
            .end((err, res) => {
              should.exist(err)
              res.should.be.json
              res.status.should.equal(401)
              res.body.status.should.equal('error')
              res.body.error.should.equal('Please log in')
              done()
            })
        })
    })
    it('returns 403 error if the user does not own the profile', (done) => {
      specHelpers.loginUser()
        .end((err, res) => {
          const authToken = res.body.token
          User.getUserByEmail('anotheruser@example.com')
            .then((anotherUser) => {
              chai.request(server)
                .get(`/api/v1/users/${anotherUser.id}`)
                .set('authorization', `Bearer ${authToken}`)
                .end((err, res) => {
                  should.exist(err)
                  res.should.be.json
                  res.status.should.equal(403)
                  res.body.status.should.equal('error')
                  res.body.error.should.equal('You are not authorized to access this page')
                  done()
                })
            })
            .catch(err => console.log(err))
        })
    })
  })
})
