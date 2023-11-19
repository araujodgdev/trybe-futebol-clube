import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { matches, matchesFinished, matchesInProgress } from './mocks/MatchMocks';

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

  afterEach(() => sinon.restore())
});
