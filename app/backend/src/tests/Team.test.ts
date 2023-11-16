import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { teams } from './mocks/Team.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /teams', () => {

  it('GET /teams - Should return a list of teams', async function() {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(teams);
  })

  it('GET /teams/:id - Should return a team', async function() {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(teams[0] as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(teams[0]);
  });

  it('GET /teams/:id - Should return a 404 error', async function() {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.be.equal(404);
    expect(body).to.be.deep.equal({
        message: 'Team 1 not found',
    });
  });

  afterEach(() => sinon.restore())
});
