const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const should = chai.should();
chai.use(chaiHttp);

describe('API Routes', () => {
  describe ('GET /api/v1/asks', () => {
    it('should return all asks', () => {
      chai.request(server)
        .get('/api/v1/asks')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(3);
          res.body[0].should.have.property('id');
          res.body[0].should.have.property('title');
          res.body[0].should.have.property('description');
          res.body[0].should.have.property('start');
          res.body[0].should.have.property('end');
          res.body[0].should.have.property('location');
        });
    });
  });
  describe ('GET /api/v1/asks/:id', () => {
    it('should return an ask matching the path id', () => {
      chai.request(server)
        .get('/api/v1/asks/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('title');
          res.body.should.have.property('description');
          res.body.should.have.property('start');
          res.body.should.have.property('end');
          res.body.should.have.property('location');
        });
    });
  });
});
