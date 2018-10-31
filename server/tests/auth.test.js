process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const User = require('../models/user.model');
const expect = chai.expect;

chai.use(chaiHttp);

let loginDetails = {
  'email': 'email@email.com',
  'password': '123@abc'
};
 
let registerDetails = {
  'first_name': 'Rexford',
  'last_name': 'Regdard',
  'email': 'email@email.com',
  'username': 'username',
  'password': '123@abc'
};

describe('Create Account, Login and Check Token', () => {
  beforeEach((done) => {
    User.deleteMany({}, (err) => {
      done();
    })
  });

  describe('/POST Register', () => {
    it('it should Register, Login, check token and get me', (done) => {
      chai.request(server)
        .post('/api/register')
        .send(registerDetails)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.data).to.be.an('object');
          expect(res.body.data.user).to.be.an('object');
          expect(res.body.data.token).to.be.an('string');

          chai.request(server)
            .post('/api/login')
            .send(loginDetails)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.data.user).to.be.an('object');
              expect(res.body.data.token).to.be.an('string');
              
              const token = res.body.data.token;
              chai.request(server)
                .get('/api/me')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                  expect(res.status).to.equal(200);
                  expect(res.body.data.user).to.be.an('object');

                  done();
                });
            })
        })
    })
  })
})
