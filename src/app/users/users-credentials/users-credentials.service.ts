import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserCredential, UserCredential } from 'rkc.base.back';
import { EncryptService } from '../../../global/encrypt/encrypt.service';
import { Repository } from 'typeorm';
import { UserCredentialNotEncrypted } from './dtos/users-credentials-not-encrypted';
import { IUsersCredentialsService } from './iUsers-credentials.service.interface';

@Injectable()
export class UsersCredentialsService implements IUsersCredentialsService {

    constructor(
        @InjectRepository(UserCredential)
        private readonly _usersCredentialsRepository: Repository<UserCredential>,
        private readonly _encryptService: EncryptService,
        private readonly _configService: ConfigService
    ) {}

    public async createAndEncrypt(userCredentialNotEncrypted: UserCredentialNotEncrypted): Promise<boolean> {
        const encryptedPassword = await this._encryptService.encryptString(
            userCredentialNotEncrypted.notEncryptedPassword,
            String(this._configService.get('AUTH_ENCRYPTION_PASSWORD'))
        );

        if(!encryptedPassword || encryptedPassword == userCredentialNotEncrypted.notEncryptedPassword) {
            return false;
        }

        const userCredential = {
            encryptedPassword,
            userId: userCredentialNotEncrypted.userId
        } as IUserCredential;

        return this.create(userCredential);
    }

    public async create(userCredential: IUserCredential): Promise<boolean> {
        const result = await this._usersCredentialsRepository.save(
            this._usersCredentialsRepository.create(userCredential)
        )
        return Boolean(result);
    }

    public async getByUserId(userId: string): Promise<UserCredential | null> {
        return await this._usersCredentialsRepository.findOne({
            where: {
                userId
            }
        });
    }
}
