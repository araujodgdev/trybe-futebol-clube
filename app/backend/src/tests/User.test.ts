import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import { dbUser, loginData, loginWithWrongEmail, loginWithInvalidEmail } from './mocks/User.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de User', () => {

  it('POST /login - Should return a token', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(dbUser as any);

    const { status, body } = await chai.request(app).post('/login').send(loginData);

    expect(status).to.be.equal(200);
    expect(body).to.haveOwnProperty('token');
  });
 
  it('POST /login - Should return a 401 error for an invalid email', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).post('/login').send(loginWithInvalidEmail);

    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({
        message: 'Invalid email or password',
    });
  });

  it('POST /login - Should return a 401 error for login with wrong email', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).post('/login').send(loginWithWrongEmail);

    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({
        message: 'Invalid email or password',
    });
  });

  it('POST /login - Should return a 401 error for an invalid password', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(dbUser as any);

    const { status, body } = await chai.request(app).post('/login').send({ ...loginData, password: '167' });

    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({
        message: 'Invalid email or password',
    });
  });

  it('POST /login - Should return a 401 error for a wrong password', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(dbUser as any);

    const { status, body } = await chai.request(app).post('/login').send({ ...loginData, password: '16884777' });

    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({
        message: 'Invalid email or password',
    });
  });

  it('POST /login - Should return a 400 error when there is no email or password', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(dbUser as any);

    const { status, body } = await chai.request(app).post('/login').send({});

    expect(status).to.be.equal(400);
    expect(body).to.be.deep.equal({
        message: 'All fields must be filled',
    });
  });

  it('GET /login/role - Should return a 200 status and a role', async function() {
    sinon.stub(SequelizeUser, 'findByPk').resolves(dbUser as any);

    const { body } = await chai.request(app).post('/login').send(loginData);

    const { status, body: { role } } = await chai.request(app).get('/login/role').set('authorization', `Bearer ${body.token}`);

    expect(status).to.be.equal(200);
    expect(role).to.be.equal('admin');
  });

  it('GET /login/role - Should return a 401 error for an invalid token', async function() {
    sinon.stub(SequelizeUser, 'findByPk').resolves(dbUser as any);

    const { body } = await chai.request(app).post('/login').send(loginData);

    const { status, body: { role } } = await chai.request(app).get('/login/role').set('authorization', 'Bearer token');

    expect(status).to.be.equal(401);
  });

  it('GET /login/role - Should return a 401 error when there is no authorization', async function() {
    sinon.stub(SequelizeUser, 'findByPk').resolves(dbUser as any);

    const { body } = await chai.request(app).post('/login').send(loginData);

    const { status, body: { role } } = await chai.request(app).get('/login/role')

    expect(status).to.be.equal(401);
  });

  afterEach(() => sinon.restore())
});
