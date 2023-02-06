import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createCipheriv, createDecipheriv, scrypt } from 'crypto';
import { promisify } from 'util';
import { IEncryptService } from './iEncrypt.service.interface';

@Injectable()
export class EncryptService implements IEncryptService {
  private iv: Buffer;

  constructor(private readonly _configService: ConfigService) {
    this.iv = Buffer.from(String(this._configService.get('AUTH_ENCRYPTION_IV')));
  }

  public async decryptString(strToDecrypt: string, password: string): Promise<string> {
    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;

    const decipher = createDecipheriv('aes-256-ctr', key, this.iv);
    const decryptedText = Buffer.concat([decipher.update(Buffer.from(strToDecrypt, 'hex')), decipher.final()]);

    return decryptedText.toString();
  }

  public async compareEncryptString(stringToCompare: string, encryptedStr: string, password: string): Promise<boolean> {
    const stringDecrypted = await this.decryptString(encryptedStr, password);

    return stringDecrypted === stringToCompare;
  }

  public async encryptString(strToEncrypt: string, password: string): Promise<string> {
    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, this.iv);

    const encryptedStr = Buffer.concat([cipher.update(strToEncrypt), cipher.final()]);

    return encryptedStr.toString('hex');
  }
}
