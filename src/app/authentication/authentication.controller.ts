import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { IUserCredential } from 'rkc.base.back';
import { UserCredentialNotEncrypted } from '../users/users-credentials/dtos/users-credentials-not-encrypted.dto';
import { UsersCredentialsService } from '../users/users-credentials/users-credentials.service';
import { LocalAuthGuard } from './local-auth/local-auth.guard';

@Controller('authentication')
export class AuthenticationController {

    @UseGuards(LocalAuthGuard)
    @Post('login')
    public async login(@Request() req: any) {
        return req.user
    }
}
