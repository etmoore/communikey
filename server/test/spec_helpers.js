const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')

chai.use(chaiHttp)

function loginUser () {
  return chai.request(server)
    .post('/api/v1/auth/login')
    .send({
      email: 'testuser@example.com',
      password: 'testuser123'
    })
}

module.exports = {
  loginUser
}
