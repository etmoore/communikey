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
    it('should return all asks', function () {
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
        })
    })
  })
  describe('GET /api/v1/asks/:id', () => {
    it('should return an ask matching the path id', () => {
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
        })
    })
  })
  describe('POST /api/v1/asks/', () => {
    it('create a new ask', () => {
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
        })
    })
  })
  describe('PUT /api/v1/asks/:id', () => {
    it('update an ask', () => {
      Ask.getAllAsks()
        .then((jobs) => {
          const job = jobs[0]
          chai.request(server)
            .put(`/api/v1/asks/${job.id}`)
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
            })
        })
        .catch(err => console.log(err))
    })
  })
  describe('DELETE /api/v1/asks/:id', () => {
    it('delete an ask', () => {
      Ask.getAllAsks().then((asks) => {
        const beforeCount = asks.length
        chai.request(server)
          .delete(`/api/v1/asks/1`)
          .end((err, res) => {
            res.body.status.should.equal('success')
            Ask.getAllAsks().then((asks) => {
              asks.length.should.equal(beforeCount - 1)
            })
          })
      })
    })
  })
})
