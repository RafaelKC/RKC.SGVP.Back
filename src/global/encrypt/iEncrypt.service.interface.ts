export abstract class IEncryptService {
  public abstract encryptString(strToEncrypt: string, password: string): Promise<string>;
  public abstract decryptString(strToDecrypt: string, password: string): Promise<string>;
  public abstract compareEncryptString(
    stringToCompare: string,
    encryptedStr: string,
    password: string,
  ): Promise<boolean>;
}
