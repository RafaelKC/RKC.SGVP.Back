import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'rkc.base.back';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { LoginResult } from './dtos/login-result.dto';
import { TestUtils } from '../../global/utils/test-utils';

describe('AuthenticationController', () => {
  const testUtils = new TestUtils();

  let authenticationController: AuthenticationController;
  let authenticationService: AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [
        {
          provide: AuthenticationService,
          useValue: {
            login: jest.fn(),
            logout: jest.fn(),
          },
        },
      ],
    }).compile();

    authenticationController = module.get<AuthenticationController>(AuthenticationController);
    authenticationService = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should be defined', () => {
    expect(authenticationController).toBeDefined();
    expect(authenticationService).toBeDefined();
  });

  describe('Testing Methods', () => {
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

      const request = {
        user,
      };

      const loginResult = {
        accessToken: '123456',
        success: true,
        user,
      } as LoginResult;

      jest.spyOn(authenticationService, 'login').mockResolvedValue(loginResult);

      // Act
      const response = await authenticationController.login(request);

      // Arrange
      expect(response).toBe(loginResult);
      expect(authenticationService.login).toBeCalledTimes(1);
      expect(authenticationService.login).toBeCalledWith(user);
    });

    it('logout', async () => {
      // Assert
      const user = {
        firstName: 'Jon',
        lastName: ' Gates',
        username: 'jonGates',
        email: 'jonGates@mail.com',
        isActive: true,
        id: 'ea09da88-99f6-4bc0-b28b-297a6502f02a',
      } as User;

      const request = {
        user,
      };

      jest.spyOn(authenticationService, 'logout').mockResolvedValue(true);

      // Act
      const response = await authenticationController.logout(request, testUtils.Response);

      // Arrange
      expect(response).not.toBeDefined();
      expect(authenticationService.logout).toBeCalledTimes(1);
      expect(authenticationService.logout).toBeCalledWith(user.id);
    });
  });
});
