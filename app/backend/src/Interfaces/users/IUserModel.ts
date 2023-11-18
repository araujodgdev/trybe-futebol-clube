import IUser from './IUser';

export type loginPayload = {
  email: string;
  password: string;
};

export default interface IUserModel {
  findByEmail(email: loginPayload['email']): Promise<IUser | null>;
  findById(id: IUser['id']): Promise<IUser | null>;
}
