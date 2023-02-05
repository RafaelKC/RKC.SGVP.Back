import { IUserCredential, UserCredential } from 'rkc.base.back';
import { UserCredentialNotEncrypted } from './dtos/users-credentials-not-encrypted.dto';

export abstract class IUsersCredentialsService {
  public abstract create(userCredential: IUserCredential): Promise<boolean>;
  public abstract createAndEncrypt(userCredentialNotEncrypted: UserCredentialNotEncrypted): Promise<boolean>;
  public abstract getByUserId(userId: string): Promise<UserCredential | null>;
}
