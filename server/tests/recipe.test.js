process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const Recipe = require('../models/recipe.model');
const expect = chai.expect;

chai.use(chaiHttp);

let loginDetails = {
  'email': 'email@email.com',
  'password': '123@abc'
};

describe('Recipe', () => {
  let token;

  before((done) => {
    Recipe.deleteMany();

    chai.request(server)
      .post('/api/login')
      .send(loginDetails)
      .end((err, res) => {
        token = res.body.data.token;
        done();
      });
  });

  describe('/GET recipes', () => {
    it('it should GET all the resumes', (done) => {
      chai.request(server)
        .get('/api/recipes')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.recipes).to.be.an('array');
          done();
        });
    });
  });

  describe('/POST recipes', () => {
    it('it should to return errors', (done) => {
      chai.request(server)
        .post('/api/recipes')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body.errors).to.be.an('array');
          expect(res.body.errors.length).to.not.equal(0);
          done();
        });
    });

    it('it should to create a new recipe', (done) => {
      const recipe = {
        title: 'title',
        description: 'description'
      };

      chai.request(server)
        .post('/api/recipes')
        .set('Authorization', `Bearer ${token}`)
        .send(recipe)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.data.recipe).to.be.an('object');
          done();
        });
    });
  });

  describe('/GET :id recipe', () => {
    it('it should to GET a recipe by the given id', (done) => {
      Recipe.findOne().then(recipe => {
        chai.request(server)
          .get(`/api/recipes/${recipe._id}`)
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.data.recipe).to.be.an('object');
            done();
          });
      });
    });
  });

  describe('/DELETE :id recipe', () => {
    it('it should to DELETE a recipe by the given id', (done) => {
      Recipe.findOne().then(recipe => {
        chai.request(server)
          .delete(`/api/recipes/${recipe._id}`)
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal('Recipe was destroyed!');
            expect(res.body.data.recipe).to.be.an('object');
            done();
          });
      });
    });
  });
});


