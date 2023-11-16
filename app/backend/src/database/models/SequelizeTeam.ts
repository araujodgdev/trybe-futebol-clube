import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class SequelizeTeam extends Model<
InferAttributes<SequelizeTeam>,
InferCreationAttributes<SequelizeTeam>
> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

SequelizeTeam.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    teamName: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'team_name',
    },
  },
  {
    sequelize: db,
    tableName: 'teams',
    timestamps: false,
  },
);

export default SequelizeTeam;
