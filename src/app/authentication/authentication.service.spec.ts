import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { EncryptService } from 'src/global/encrypt/encrypt.service';
import { UsersService } from '../users/users.service';
import { AuthenticationService } from './authentication.service';
import { UserLogin } from './dtos/user-login.dto';
import { User, UserCredential } from 'rkc.base.back';
import { LoginResult } from './dtos/login-result.dto';
import { CACHE_MANAGER } from '@nestjs/common';
import { IUsersCredentialsService } from '../users/users-credentials/iUsers-credentials.service.interface';

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let usersService: UsersService;
  let encryptService: EncryptService;
  let usersCredentialsService: IUsersCredentialsService;
  let configService: ConfigService;
  let jwtService: JwtService;
  let cacheService: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        {
          provide: UsersService,
          useValue: {
            getByEmailOrUsername: jest.fn(),
          },
        },
        {
          provide: IUsersCredentialsService,
          useValue: {
            getByUserId: jest.fn(),
          },
        },
        {
          provide: EncryptService,
          useValue: {
            compareEncryptString: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
            del: jest.fn(),
          },
        },
      ],
    }).compile();

    authenticationService = module.get<AuthenticationService>(AuthenticationService);

    usersService = module.get<UsersService>(UsersService);
    usersCredentialsService = module.get<IUsersCredentialsService>(IUsersCredentialsService);
    encryptService = module.get<EncryptService>(EncryptService);
    configService = module.get<ConfigService>(ConfigService);
    jwtService = module.get<JwtService>(JwtService);
    cacheService = module.get<Cache>(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(authenticationService).toBeDefined();

    expect(usersService).toBeDefined();
    expect(usersCredentialsService).toBeDefined();
    expect(encryptService).toBeDefined();
    expect(configService).toBeDefined();
    expect(jwtService).toBeDefined();
    expect(cacheService).toBeDefined();
  });

  describe('Testing Methods', () => {
    it('ValidateUser', async () => {
      // Assert
      const user = {
        firstName: 'Jon',
        lastName: ' Gates',
        username: 'jonGates',
        email: 'jonGates@mail.com',
        isActive: true,
        id: 'ea09da88-99f6-4bc0-b28b-297a6502f02a',
      } as User;

      const userCredentials = {
        encryptedPassword: '123psw',
        id: 'c80df05b-9fa2-4759-ac1c-f9187d312983',
        userId: user.id,
      } as UserCredential;

      const userLogin = {
        password: '1234',
        usernameOrEmail: user.email,
      } as UserLogin;

      jest.spyOn(usersService, 'getByEmailOrUsername').mockResolvedValueOnce(user);
      jest.spyOn(usersCredentialsService, 'getByUserId').mockResolvedValueOnce(userCredentials);
      jest.spyOn(encryptService, 'compareEncryptString').mockResolvedValueOnce(true);
      jest.spyOn(configService, 'get').mockReturnValueOnce('1234');

      // Act
      const result = await authenticationService.validateUser(userLogin);

      // Arrange

      expect(result).toBe(user);

      expect(usersService.getByEmailOrUsername).toBeCalledTimes(1);
      expect(usersService.getByEmailOrUsername).toBeCalledWith(userLogin.usernameOrEmail);

      expect(usersCredentialsService.getByUserId).toBeCalledTimes(1);
      expect(usersCredentialsService.getByUserId).toBeCalledWith(user.id);

      expect(encryptService.compareEncryptString).toBeCalledTimes(1);
      expect(encryptService.compareEncryptString).toBeCalledWith(
        userLogin.password,
        userCredentials.encryptedPassword,
        '1234',
      );

      expect(configService.get).toBeCalledTimes(1);
      expect(configService.get).toBeCalledWith('AUTH_ENCRYPTION_PASSWORD');

      expect(jwtService.sign).not.toBeCalled();
    });

    it('login', async () => {
      // Assert
      const user = {
        firstName: 'Jon',
        lastName: ' Gates',
        username: 'jonGates',
        email: 'jonGates@mail.com',
        isActive: true,
        id: 'ea09da88-99f6-4bc0-b28b-297a6502f02a',
      } as User;

      jest.spyOn(jwtService, 'sign').mockReturnValueOnce('1234567890');

      // Act
      const result = await authenticationService.login(user);

      // Arrange
      expect(result).toStrictEqual(new LoginResult('1234567890', user));

      expect(jwtService.sign).toBeCalledTimes(1);
      expect(jwtService.sign).toBeCalledWith({ user });

      expect(usersService.getByEmailOrUsername).not.toBeCalled();
      expect(usersCredentialsService.getByUserId).not.toBeCalled();
      expect(encryptService.compareEncryptString).not.toBeCalled();
      expect(configService.get).not.toBeCalled();
    });
  });
});
