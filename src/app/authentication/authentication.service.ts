import { Injectable } from '@nestjs/common';
import { UsersCredentialsService } from '../users/users-credentials/users-credentials.service';
import { UsersService } from '../users/users.service';
import { iAuthenticationService } from './authentication.service.interface';

@Injectable()
export class AuthenticationService implements iAuthenticationService {

    constructor(
        private readonly _usersService: UsersService,
        private readonly _usersCredentialsService: UsersCredentialsService
    ) {}

    // public async validateUser()

}
