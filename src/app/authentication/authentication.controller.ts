import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth/local-auth.guard';

@Controller('authentication')
export class AuthenticationController {

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req: any) {
        console.log(req);
        console.log(typeof(req));
        return req.user
    }

}
