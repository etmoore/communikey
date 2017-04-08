/* eslint-disable no-undef, no-unused-expressions, handle-callback-err */
process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const knex = require('../db/knex')
const Ask = require('../db/models/Ask')

chai.should()
chai.use(chaiHttp)

describe('API Routes', function () {
  beforeEach(() => (
    knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run())
  ))

  afterEach(() => (
    knex.migrate.rollback()
  ))

  describe('GET /api/v1/asks', function () {
    it('should return all asks', function (done) {
      chai.request(server)
        .get('/api/v1/asks')
        .end((err, res) => {
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
          done()
        })
    })
  })
  describe('GET /api/v1/asks/:id', () => {
    it('should return an ask matching the path id', (done) => {
      chai.request(server)
        .get('/api/v1/asks/1')
        .end((err, res) => {
          res.should.have.status(200)
          res.should.be.json
          res.body.should.be.a('object')
          res.body.should.have.property('id')
          res.body.should.have.property('title')
          res.body.should.have.property('description')
          res.body.should.have.property('start')
          res.body.should.have.property('end')
          res.body.should.have.property('location')
          done()
        })
    })
  })
  describe('POST /api/v1/asks/', () => {
    it('create a new ask', (done) => {
      chai.request(server)
        .post('/api/v1/asks/')
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
          done()
        })
    })
  })
  describe('PUT /api/v1/asks/:id', () => {
    it('update an ask', (done) => {
      Ask.getAllAsks()
        .then((asks) => {
          const ask = asks[0]
          chai.request(server)
            .put(`/api/v1/asks/${ask.id}`)
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
              done()
            })
        })
        .catch(err => console.log(err))
    })
  })
  describe('DELETE /api/v1/asks/:id', () => {
    it('delete an ask', (done) => {
      Ask.getAllAsks().then((asks) => {
        const beforeCount = asks.length
        chai.request(server)
          .delete(`/api/v1/asks/1`)
          .end((err, res) => {
            res.body.status.should.equal('success')
            Ask.getAllAsks().then((asks) => {
              asks.length.should.equal(beforeCount - 1)
              done()
            })
          })
      })
    })
  })
  describe('POST /api/v1/register', () => {
    it('registers a new user', (done) => {
      chai.request(server)
        .post('/api/v1/register')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.token.should.be.string
          res.body.status.should.equal('success')
          done()
        })
    })
  })
  xdescribe('POST /api/v1/login', () => {})
})
