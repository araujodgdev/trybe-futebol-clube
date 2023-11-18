import SequelizeUser from '../database/models/SequelizeUser';
import IUser from '../Interfaces/users/IUser';
import IUserModel from '../Interfaces/users/IUserModel';

export default class UserModel implements IUserModel {
  constructor(private model = SequelizeUser) {}

  public async findByEmail(email: string): Promise<IUser | null> {
    const dbData = await this.model.findOne({ where: { email } });
    if (!dbData) return null;

    const { id, password, username, role }: IUser = dbData;
    return { id, email, password, username, role };
  }
}
