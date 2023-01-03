import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'rkc.base.back';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly _configService: ConfigService,
        private readonly _authenticationService: AuthenticationService
        ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: _configService.get('AUTH_JWT_SECRET')
        })
    }

    public async validate(payload: any): Promise<User> {
        const user = payload.user as User;
        if (await this. _authenticationService.validateAccessToken(user.id)) return user;
        throw new UnauthorizedException;
        
    }

}