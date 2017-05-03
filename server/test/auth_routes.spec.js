/* eslint-disable no-undef, no-unused-expressions, handle-callback-err */
process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const knex = require('../db/knex')
const should = chai.should()

chai.use(chaiHttp)

describe('Auth Routes', function () {
  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
  })

  afterEach(() => {
    return knex.migrate.rollback()
  })

  describe('POST /api/v1/auth/register', () => {
    it('registers a new user', (done) => {
      chai.request(server)
        .post('/api/v1/auth/register')
        .send({
          firstName: 'Bob',
          lastName: 'Fink',
          email: 'bob@example.com',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(200)
          res.should.be.json
          res.body.should.include.keys('status', 'token')
          res.body.status.should.eql('success')
          done()
        })
    })

    it('should not allow duplicate emails', (done) => {
      chai.request(server)
        .post('/api/v1/auth/register')
        .send({
          firstName: 'Bob',
          lastName: 'Fink',
          email: 'testuser@example.com', // already created in seed
          password: 'password'
        })
        .end((err, res) => {
          // console.log(res)
          should.exist(err)
          res.status.should.eql(500)
          res.should.be.json
          res.body.status.should.eql('error')
          done()
        })
    })
  })

  describe('POST /api/v1/auth/login', () => {
    it('should login a user', () => {
      return chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'testuser@example.com',
          password: 'testuser123'
        })
        .then((res) => {
          res.redirects.length.should.eql(0)
          res.status.should.eql(200)
          res.should.be.json
          res.body.should.include.keys('status', 'token')
          res.body.status.should.eql('success')
          res.body.token.should.be.a('string')
        })
    })
    it('should not login an unregistered user', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'baduser@example.com',
          password: 'testuser123'
        })
        .end((err, res) => {
          should.exist(err)
          res.status.should.eql(500)
          res.should.be.json
          res.body.status.should.eql('error')
          done()
        })
    })
  })
})
