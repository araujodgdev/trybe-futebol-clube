import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
// import IUser from '../Interfaces/users/IUser';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import UserModel from '../models/UserModel';
import IUserModel, { loginPayload } from '../Interfaces/users/IUserModel';
import IUser from '../Interfaces/users/IUser';

type token = {
  token: string;
};

export default class UserService {
  constructor(private userModel: IUserModel = new UserModel()) {}

  public async login(data: loginPayload): Promise<ServiceResponse<token>> {
    const user = await this.userModel.findByEmail(data.email);
    if (!user) return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const token = jwt
      .sign({ id: user.id }, process.env.JWT_SECRET as string || 'secret', { expiresIn: '1d' });

    return {
      status: 'SUCCESSFUL',
      data: { token },
    };
  }

  public async findRole(id: IUser['id']): Promise<ServiceResponse<string>> {
    const role = await this.userModel.findRole(id) as string;

    return {
      status: 'SUCCESSFUL',
      data: role,
    };
  }
}
