/* eslint-disable no-undef, no-unused-expressions, handle-callback-err */
process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const knex = require('../db/knex')
const Ask = require('../db/models/Ask')
const User = require('../db/models/User')
const authHelpers = require('../helpers/auth')

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
          res.body[0].should.have.property('user_id')
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
          res.body.should.have.property('user_id')
        })
    })
  })

  describe('POST /api/v1/asks/', () => {
    it('create a new ask', () => {
      return User.getAllUsers()
        .then((users) => {
          const user = users[0]
          const userID = user.id
          const authToken = authHelpers.encodeToken(user)
          return chai.request(server)
            .post('/api/v1/asks/')
            .set('authorization', `Bearer ${authToken}`)
            .send({
              title: 'Help needed',
              description: 'Please consider lending a hand',
              start: new Date('Sat Apr 08 2017 10:00:00 MDT'),
              end: new Date('Sat Apr 08 2017 16:00:00 MDT'),
              location: 'Pittsburgh, PA',
              user_id: userID
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
          res.body.should.have.property('user_id')
        })
    })
    it('should not allow an unauthorized user to create an ask', (done) => {
      User.getAllUsers()
        .then((users) => {
          const user = users[0]
          const userID = user.id
          chai.request(server)
            .post('/api/v1/asks/')
            // not setting an authorization header
            .send({
              title: 'Help needed',
              description: 'Please consider lending a hand',
              start: new Date('Sat Apr 08 2017 10:00:00 MDT'),
              end: new Date('Sat Apr 08 2017 16:00:00 MDT'),
              location: 'Pittsburgh, PA',
              user_id: userID
            })
            .end((err, res) => {
              should.exist(err)
              res.should.have.status(500)
              res.should.be.json
              res.body.status.should.eql('error')
              res.body.status.should.eql('error')
              done()
            })
        })
    })
  })

  describe('PUT /api/v1/asks/:id', () => {
    it('should update an ask', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'testuser@example.com',
          password: 'testuser123'
        })
        .then((res) => {
          const authToken = res.body.token
          Ask.getAllAsks()
            .then((asks) => {
              const ask = asks[0]
              chai.request(server)
                .put(`/api/v1/asks/${ask.id}`)
                .set('authorization', `Bearer ${authToken}`)
                .send({
                  title: 'Help needed',
                  description: 'Please consider lending a hand',
                  start: new Date('Sat Apr 08 2017 10:00:00 MDT'),
                  end: new Date('Sat Apr 08 2017 16:00:00 MDT'),
                  location: 'Pittsburgh, PA'
                })
                .end((err, res) => {
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
                  res.body.should.have.property('user_id')
                  done()
                })
            })
        })
    })
    it('should not allow an unauthorized user to update an ask', (done) => {
      Ask.getAllAsks()
        .then((asks) => {
          const ask = asks[0]
          chai.request(server)
            .put(`/api/v1/asks/${ask.id}`)
            // NOT setting an authorization header
            .send({
              title: 'Help needed',
              description: 'Please consider lending a hand',
              start: new Date('Sat Apr 08 2017 10:00:00 MDT'),
              end: new Date('Sat Apr 08 2017 16:00:00 MDT'),
              location: 'Pittsburgh, PA'
            })
            .end((err, res) => {
              should.exist(err)
              res.should.be.json
              res.should.have.status(500)
              res.body.status.should.eql('error')
              res.body.error.should.eql('Please log in')
              done()
            })
        })
    })
  })

  describe('DELETE /api/v1/asks/:id', () => {
    it('should delete an ask', () => {
      let beforeCount
      return Ask.getAllAsks()
        .then((asks) => {
          beforeCount = asks.length
          return chai.request(server)
            .post('/api/v1/auth/login')
            .send({
              email: 'testuser@example.com',
              password: 'testuser123'
            })
        })
        .then((response) => {
          return chai.request(server)
            .delete(`/api/v1/asks/1`)
            .set('authorization', 'Bearer ' + response.body.token)
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

  describe('DELETE /api/v1/asks/:id', () => {
    it('throw an error if the user is not logged in', () => {
      return Ask.getAllAsks()
        .then((asks) => {
          beforeCount = asks.length
          return chai.request(server).delete(`/api/v1/asks/1`)
        })
        .catch((err) => {
          should.exist(err)
          err.status.should.eql(500)
        })
    })
  })
})
