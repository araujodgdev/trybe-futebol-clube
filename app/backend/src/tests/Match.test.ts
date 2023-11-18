import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { matches } from './mocks/MatchMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /matches', () => {

  it('GET /matches - Deve retornar um array de partidas', async function() {
    sinon.stub(SequelizeTeam, 'findAll').resolves(matches as any);

    const { body, status } = await chai.request(app).get('/matches');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(matches);
  })

  afterEach(() => sinon.restore())
});
