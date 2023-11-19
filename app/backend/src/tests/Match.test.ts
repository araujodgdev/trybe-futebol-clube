import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { matches, matchesFinished, matchesInProgress } from './mocks/MatchMocks';
import LoginValidation from '../middlewares/LoginValidation';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /matches', () => {

  it('GET /matches - Deve retornar um array de partidas', async function() {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matches as any);

    const { body, status } = await chai.request(app).get('/matches');

    expect(status).to.be.equal(200);
    expect(body).to.have.lengthOf(2);
  })

  it('GET /matches?inProgress=true - Deve retornar um array de partidas em andamento', async function() {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesInProgress as any);

    const { body, status } = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.be.equal(200);
    expect(body).to.have.lengthOf(1);
    expect(body[0].in_progress).to.be.equal(true);
  });
    
  it('GET /matches?inProgress=false - Deve retornar um array de partidas finalizadas', async function() {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesFinished as any);

    const { body, status } = await chai.request(app).get('/matches?inProgress=false');

    expect(status).to.be.equal(200);
    expect(body).to.have.lengthOf(1);
    expect(body[0].in_progress).to.be.equal(false);
  });

  it('PATCH /matches/:id/finish - Deve finalizar uma partida', async function() {
    sinon.stub(SequelizeMatch, 'update').resolves([1]);

    const token = await chai.request(app).post('/login').send({ email: 'user@user.com', password: 'secret_user'});
    const { status } = await chai.request(app).patch('/matches/1/finish').set('authorization', `Bearer ${token.body.token}`);

    expect(status).to.be.equal(200);
  });

  it('PATCH /matches/:id/finish - Deve retornar erro 404 ao tentar finalizar uma partida que não existe', async function() {
    sinon.stub(SequelizeMatch, 'update').resolves([0]);
    
    const token = await chai.request(app).post('/login').send({ email: 'user@user.com', password: 'secret_user'});
    const { status } = await chai.request(app).patch('/matches/19998/finish').set('authorization', `Bearer ${token.body.token}`);

    expect(status).to.be.equal(404);
  });

  it('PATCH /matches/:id - Deve atualizar o resultado de uma partida', async function() {
    sinon.stub(SequelizeMatch, 'update').resolves([1]);
    
    const token = await chai.request(app).post('/login').send({ email: 'user@user.com', password: 'secret_user'});
    const { status } = await chai.request(app).patch('/matches/1').send({ homeTeamGoals: 1, awayTeamGoals: 2 }).set('authorization', `Bearer ${token.body.token}`);

    expect(status).to.be.equal(200);
  });

  it('PATCH /matches/:id - Deve retornar erro 404 ao tentar atualizar o resultado de uma partida que não existe', async function() {
    sinon.stub(SequelizeMatch, 'update').resolves([0]);
    
    const token = await chai.request(app).post('/login').send({ email: 'user@user.com', password: 'secret_user'});
    const { status } = await chai.request(app).patch('/matches/1988978').send({ homeTeamGoals: 1, awayTeamGoals: 2 }).set('authorization', `Bearer ${token.body.token}`);

    expect(status).to.be.equal(404);
  });

  afterEach(() => sinon.restore())
});
