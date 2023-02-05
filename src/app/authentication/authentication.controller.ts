import { Controller, Post, UseGuards, Request, Res } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'rkc.base.back';
import { AuthenticationService } from './authentication.service';
import { LoginResult } from './dtos/login-result.dto';
import { JwtAuthGuard } from './jwt-auth/jwt-auth.guard';
import { LocalAuthGuard } from './local-auth/local-auth.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly _authService: AuthenticationService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Request() req: any): Promise<LoginResult> {
    return await this._authService.login(req.user as User);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  public async logout(@Request() req: any, @Res() res: Response): Promise<void> {
    if (await this._authService.logout((req.user as User).id)) {
      res.status(302).redirect('/login');
    }
  }
}
