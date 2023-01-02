import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { IUserCredential, User } from 'rkc.base.back';
import { UserCredentialNotEncrypted } from '../users/users-credentials/dtos/users-credentials-not-encrypted.dto';
import { UsersCredentialsService } from '../users/users-credentials/users-credentials.service';
import { AuthenticationService } from './authentication.service';
import { LocalAuthGuard } from './local-auth/local-auth.guard';

@Controller('authentication')
export class AuthenticationController {

    constructor(private readonly _authService: AuthenticationService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    public async login(@Request() req: any) {
        return await this._authService.login(req.user as User)
    }
}
