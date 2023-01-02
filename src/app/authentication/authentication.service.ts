import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'rkc.base.back';
import { EncryptService } from 'src/global/encrypt/encrypt.service';
import { UsersCredentialsService } from '../users/users-credentials/users-credentials.service';
import { UsersService } from '../users/users.service';
import { iAuthenticationService } from './authentication.service.interface';
import { LoginResult } from './dtos/login-result.dto';
import { UserLogin } from './dtos/user-login.dto';

@Injectable()
export class AuthenticationService implements iAuthenticationService {

    constructor(
        private readonly _usersService: UsersService,
        private readonly _usersCredentialsService: UsersCredentialsService,
        private readonly _encryptService: EncryptService,
        private readonly _configService: ConfigService,
        private readonly _jwtService: JwtService,
    ) {}

    public async validateUser(userLogin: UserLogin): Promise<User | null> {
        const user = await this._usersService.getByEmailOrUsername(userLogin.usernameOrEmail);
        if (!user || !user.isActive) return null;

        const userCredentials = await this._usersCredentialsService.getByUserId(user.id);
        if (!userCredentials) return null;

        const passwordMatch = await this._encryptService.compareEncryptString(
            userLogin.password,
            userCredentials.encryptedPassword,
            String(this._configService.get('AUTH_ENCRYPTION_PASSWORD'))
            )

        if (!passwordMatch) return null;

        return user;

    }

    public login(user: User): LoginResult {
        const payload = { user };
        const accessToken = this._jwtService.sign(payload);
        return new LoginResult(accessToken, user);
    }

}
