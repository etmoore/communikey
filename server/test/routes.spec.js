/* eslint-disable no-undef, no-unused-expressions, handle-callback-err */
process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const knex = require('../db/knex')
const Ask = require('../db/models/Ask')

const should = chai.should()
chai.use(chaiHttp)

describe('API Routes', function () {
  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
  })

  afterEach(() => {
    return knex.migrate.rollback()
  })

  /**************/
  /* ASK Routes */
  /**************/
  describe('GET /api/v1/asks', function () {
    it('should return all asks', function () {
      return chai.request(server)
        .get('/api/v1/asks')
        .then((res) => {
          res.should.have.status(200)
          res.should.be.json
          res.body.should.be.a('array')
          res.body.length.should.equal(3)
          res.body[0].should.have.property('id')
          res.body[0].should.have.property('title')
          res.body[0].should.have.property('description')
          res.body[0].should.have.property('start')
          res.body[0].should.have.property('end')
          res.body[0].should.have.property('location')
        })
    })
  })

  describe('GET /api/v1/asks/:id', () => {
    it('should return an ask matching the path id', () => {
      return chai.request(server)
        .get('/api/v1/asks/1')
        .then((res) => {
          res.should.have.status(200)
          res.should.be.json
          res.body.should.be.a('object')
          res.body.should.have.property('id')
          res.body.should.have.property('title')
          res.body.should.have.property('description')
          res.body.should.have.property('start')
          res.body.should.have.property('end')
          res.body.should.have.property('location')
        })
    })
  })

  describe('POST /api/v1/asks/', () => {
    it('create a new ask', () => {
      return chai.request(server)
        .post('/api/v1/asks/')
        .send({
          title: 'Help needed',
          description: 'Please consider lending a hand',
          start: new Date('Sat Apr 08 2017 10:00:00 MDT'),
          end: new Date('Sat Apr 08 2017 16:00:00 MDT'),
          location: 'Pittsburgh, PA'
        })
        .then((res) => {
          res.should.have.status(200)
          res.should.be.json
          res.body.should.be.a('object')
          res.body.should.have.property('id')
          res.body.should.have.property('title')
          res.body.title.should.equal('Help needed')
          res.body.should.have.property('description')
          res.body.description.should.equal('Please consider lending a hand')
          res.body.should.have.property('start')
          res.body.should.have.property('end')
          res.body.should.have.property('location')
        })
    })
  })

  describe('PUT /api/v1/asks/:id', () => {
    it('update an ask', () => {
      return Ask.getAllAsks()
        .then((asks) => {
          const ask = asks[0]
          return chai.request(server)
            .put(`/api/v1/asks/${ask.id}`)
            .send({
              title: 'Help needed',
              description: 'Please consider lending a hand',
              start: new Date('Sat Apr 08 2017 10:00:00 MDT'),
              end: new Date('Sat Apr 08 2017 16:00:00 MDT'),
              location: 'Pittsburgh, PA'
            })
        })
        .then((res) => {
          res.should.have.status(200)
          res.should.be.json
          res.body.should.be.a('object')
          res.body.should.have.property('id')
          res.body.should.have.property('title')
          res.body.title.should.equal('Help needed')
          res.body.should.have.property('description')
          res.body.description.should.equal('Please consider lending a hand')
          res.body.should.have.property('start')
          res.body.should.have.property('end')
          res.body.should.have.property('location')
        })
    })
  })

  describe('DELETE /api/v1/asks/:id', () => {
    it('delete an ask', () => {
      let beforeCount
      return Ask.getAllAsks()
        .then((asks) => {
          beforeCount = asks.length
          return chai.request(server).delete(`/api/v1/asks/1`)
        })
        .then((res) => {
          res.body.status.should.equal('success')
          return Ask.getAllAsks()
        })
        .then((asks) => {
          asks.length.should.equal(beforeCount - 1)
        })
    })
  })

  /***************/
  /* AUTH Routes */
  /***************/
  describe('POST /api/v1/auth/register', () => {
    it('registers a new user', () => {
      return chai.request(server)
        .post('/api/v1/auth/register')
        .send({
          firstName: 'Bob',
          lastName: 'Fink',
          email: 'bob@example.com',
          password: 'password'
        })
        .then((res) => {
          res.status.should.equal(200)
          res.should.be.json
          res.body.should.include.keys('status', 'token')
          res.body.status.should.eql('success')
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

  describe('GET api/v1/auth/user', () => {
    it('should return with status: success', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'testuser@example.com',
          password: 'testuser123'
        })
        .end((error, response) => {
          should.not.exist(error)
          const token = response.body.token
          chai.request(server)
            .get('/api/v1/auth/user')
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
              should.not.exist(err)
              res.status.should.eql(200)
              res.should.be.json
              res.body.status.should.eql('success')
              done()
            })
        })
    })
    it('should throw an error if a user is not logged in', (done) => {
      chai.request(server)
        .get('/api/v1/auth/user')
        .end((err, res) => {
          should.exist(err)
          res.status.should.eql(400)
          res.should.be.json
          res.body.status.should.eql('Please log in')
          done()
        })
    })
  })

  xdescribe('POST /api/v1/auth/logout', () => {}) // POST?
})
