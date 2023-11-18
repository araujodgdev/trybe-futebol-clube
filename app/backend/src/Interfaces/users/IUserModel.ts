import IUser from './IUser';

export type loginPayload = {
  email: string;
  password: string;
};

export default interface IUserModel {
  findByEmail(email: loginPayload['email']): Promise<IUser | null>;
  findRole(id: IUser['id']): Promise<string | null>;
}
