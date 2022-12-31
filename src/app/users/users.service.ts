import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser, User } from 'rkc.base.back';
import { Repository } from 'typeorm';
import { IUsersService } from './users.service.interface';

@Injectable()
export class UsersService implements IUsersService {

    constructor (
        @InjectRepository(User)
        private readonly _usersRepository: Repository<User>,
    ) {}

    public async create(user: IUser): Promise<boolean> {
        const result =  await this._usersRepository.save(this._usersRepository.create(user))
        return result ? true : false
    }

}
