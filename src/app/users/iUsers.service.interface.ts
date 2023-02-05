import { IUser, User } from 'rkc.base.back';

export abstract class IUsersService {
  public abstract create(user: IUser): Promise<boolean>;
  public abstract getByEmailOrUsername(emailOrUserName: string): Promise<User | null>;
}
