import { Controller, Post, UseGuards, Request, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'rkc.base.back';
import { IUsersCredentialsService } from '../users/users-credentials/iUsers-credentials.service.interface';
import { AuthenticationService } from './authentication.service';
import { LoginResult } from './dtos/login-result.dto';
import { JwtAuthGuard } from './jwt-auth/jwt-auth.guard';
import { LocalAuthGuard } from './local-auth/local-auth.guard';
import { UserCredentialNotEncrypted } from '../users/users-credentials/dtos/users-credentials-not-encrypted.dto';
import { ConfigService } from '@nestjs/config';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly _authService: AuthenticationService,
    // Remove before production
    private readonly _userCredentialsService: IUsersCredentialsService,
    private readonly _configService: ConfigService,
  ) {}

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

  // Remove before production
  @Post('credentials')
  public async createCredentials(@Body() credentials: UserCredentialNotEncrypted): Promise<void> {
    if (!Boolean(this._configService.get<boolean>('PROD'))) {
      await this._userCredentialsService.createAndEncrypt(credentials);
    }
  }
}
