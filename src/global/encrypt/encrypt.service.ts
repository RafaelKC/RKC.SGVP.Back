import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { IEncryptService } from './iEncrypt.service.interface';


@Injectable()
export class EncryptService implements IEncryptService {

    private iv = randomBytes(16);

    public async encryptString(strToEncrypt: string, password: string): Promise<string> {
        const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
        const cipher = createCipheriv('aes-256-ctr', key, this.iv);

        const encryptedStr = Buffer.concat([
            cipher.update(strToEncrypt),
            cipher.final(),
        ]);

        return encryptedStr.toString();
    }
}
