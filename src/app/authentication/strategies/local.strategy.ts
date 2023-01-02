import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationService } from '../authentication.service';
import { User } from 'rkc.base.back';
import { throws } from 'assert';
import { UserLogin } from '../dtos/user-login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly _authService: AuthenticationService) {
        super({
            usernameField: 'usernameOrEmail',
            passwordField: 'password',
        })
    }

    public async validate(usernameOrEmail: string, password: string): Promise<User> {
        const user = await this._authService.validateUser(new UserLogin(usernameOrEmail, password));
        if(!user) throw new UnauthorizedException();

        return user;
        
    }

}