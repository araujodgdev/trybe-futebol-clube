import {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Model,
} from 'sequelize';
import db from '.';
import SequelizeTeam from './SequelizeTeam';

class SequelizeMatch extends Model<
InferAttributes<SequelizeMatch>,
InferCreationAttributes<SequelizeMatch>
> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

SequelizeMatch.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    homeTeamId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'home_team_id',
      references: {
        model: 'teams',
        key: 'id',
      },
    },
    homeTeamGoals: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'home_team_goals',
    },
    awayTeamId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'away_team_id',
      references: {
        model: 'teams',
        key: 'id',
      },
    },
    awayTeamGoals: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'away_team_goals',
    },
    inProgress: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      field: 'in_progress',
    },
  },
  {
    sequelize: db,
    tableName: 'matches',
    timestamps: false,
  },
);

SequelizeMatch.belongsTo(SequelizeTeam, { as: 'homeTeam', foreignKey: 'homeTeamId' });
SequelizeMatch.belongsTo(SequelizeTeam, { as: 'awayTeam', foreignKey: 'awayTeamId' });

export default SequelizeMatch;
