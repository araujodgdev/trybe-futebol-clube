import SequelizeTeam from '../database/models/SequelizeTeam';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import ITeam from '../Interfaces/teams/ITeam';
// import { NewEntity } from '../Interfaces';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  public async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => ({ id, teamName }));
  }

  public async findById(id: ITeam['id']): Promise<ITeam | null> {
    const dbData = await this.model.findByPk(id);
    if (!dbData) return null;

    const { teamName }: ITeam = dbData;
    return { id, teamName };
  }
}
