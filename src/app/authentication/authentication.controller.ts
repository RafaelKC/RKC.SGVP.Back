import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { User } from 'rkc.base.back';
import { AuthenticationService } from './authentication.service';
import { LocalAuthGuard } from './local-auth/local-auth.guard';

@Controller('authentication')
export class AuthenticationController {

    constructor(private readonly _authService: AuthenticationService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    public login(@Request() req: any) {
        return this._authService.login(req.user as User)
    }
}
