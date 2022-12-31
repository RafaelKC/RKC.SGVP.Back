export abstract class IEncryptService {
    public abstract encryptString(strToEncrypt: string, password: string): Promise<string>
}