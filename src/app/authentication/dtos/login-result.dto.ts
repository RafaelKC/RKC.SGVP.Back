import { User } from 'rkc.base.back';

export class LoginResult {
  public accessToken: string | undefined;
  public success: boolean;
  public user: User | undefined;

  constructor(accessToken?: string, user?: User) {
    this.user = user;
    this.accessToken = accessToken;
    this.success = accessToken ? true : false;
  }
}
