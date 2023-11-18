import IUser from './IUser';

type loginPayload = {
  email: string;
  password: string;
};

export default interface IUserModel {
  findByEmail(email: loginPayload['email']): Promise<IUser | null>;
}
