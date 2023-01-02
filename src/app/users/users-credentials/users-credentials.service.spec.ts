import { ConfigService, getConfigToken } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserCredential } from 'rkc.base.back';
import { EncryptService } from '../../../global/encrypt/encrypt.service';
import { Repository } from 'typeorm';
import { UsersCredentialsService } from './users-credentials.service';
import { UserCredentialNotEncrypted } from './dtos/users-credentials-not-encrypted.dto';

describe('UsersCredentialsService', () => {
  let usersCredentialsService: UsersCredentialsService;
  let usersCredentialsRepository: Repository<UserCredential>;
  let encryptService: EncryptService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({ 
      providers: [UsersCredentialsService,
         {
        provide: getRepositoryToken(UserCredential),
        useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
         },
         {
          provide: EncryptService,
          useValue: {
              encryptString: jest.fn()
          }
        },
        {
            provide: ConfigService,
            useValue: {
                get: jest.fn()
            }
        }]
    }).compile();

    usersCredentialsService = module.get<UsersCredentialsService>(UsersCredentialsService);
    usersCredentialsRepository = module.get<Repository<UserCredential>>(getRepositoryToken(UserCredential));
    encryptService = module.get<EncryptService>(EncryptService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(usersCredentialsService).toBeDefined();
    expect(usersCredentialsRepository).toBeDefined();
    expect(encryptService).toBeDefined();
    expect(configService).toBeDefined();
  });

  describe('Testing methods', () => {
    it('getByUserId', async () => {
      // Arrange
      const userCredentialToBeFound = {
        encryptedPassword: '123psw',
        id: 'c80df05b-9fa2-4759-ac1c-f9187d312983',
        userId: 'ea09da88-99f6-4bc0-b28b-297a6502f02a'
      } as UserCredential

      jest.spyOn(usersCredentialsRepository, 'findOne').mockResolvedValueOnce(userCredentialToBeFound);
      
      // Act
      const result = await usersCredentialsService.getByUserId(userCredentialToBeFound.userId);

      // Assert
      expect(result).toBe(userCredentialToBeFound);
      expect(usersCredentialsRepository.findOne).toBeCalledTimes(1);
      expect(usersCredentialsRepository.findOne).toBeCalledWith({
        'where': {
          'userId': userCredentialToBeFound.userId
        }
        });

    })

    it('create, Ok', async () => {
      // Arrange
      const userCredentialToBeCreated = {
        encryptedPassword: '123psw',
        id: 'c80df05b-9fa2-4759-ac1c-f9187d312983',
        userId: 'ea09da88-99f6-4bc0-b28b-297a6502f02a'
      } as UserCredential

      jest.spyOn(usersCredentialsRepository, 'create').mockReturnValueOnce(userCredentialToBeCreated);
      jest.spyOn(usersCredentialsRepository, 'save').mockResolvedValueOnce(userCredentialToBeCreated);
      
      // Act
      const result = await usersCredentialsService.create(userCredentialToBeCreated);

      // Assert
      expect(result).toBeTruthy()
      expect(usersCredentialsRepository.create).toBeCalledTimes(1);
      expect(usersCredentialsRepository.create).toBeCalledWith(userCredentialToBeCreated);
      expect(usersCredentialsRepository.save).toBeCalledTimes(1);
      expect(usersCredentialsRepository.save).toBeCalledWith(userCredentialToBeCreated);

    })

    it('create, with problem', async () => {
      // Arrange
      const userCredentialToBeCreated = {
        encryptedPassword: '123psw',
        id: 'c80df05b-9fa2-4759-ac1c-f9187d312983',
        userId: 'ea09da88-99f6-4bc0-b28b-297a6502f02a'
      } as UserCredential
      
      // Act
      const result = await usersCredentialsService.create(userCredentialToBeCreated);

      // Assert
      expect(result).toBeFalsy()
      expect(usersCredentialsRepository.create).toBeCalledTimes(1);
      expect(usersCredentialsRepository.save).toBeCalledTimes(1);

    })

    it('createAndEncrypt, Ok', async () => {
      // Arrange
      const userCredentialToBeCreated = {
        encryptedPassword: '123psw',
        userId: 'ea09da88-99f6-4bc0-b28b-297a6502f02a'
      } as UserCredential

      const userCredentialNotEncrypted = {
        notEncryptedPassword: 'psw123',
        userId: 'ea09da88-99f6-4bc0-b28b-297a6502f02a'
      } as UserCredentialNotEncrypted

      jest.spyOn(usersCredentialsRepository, 'create').mockReturnValueOnce(userCredentialToBeCreated);
      jest.spyOn(usersCredentialsRepository, 'save').mockResolvedValueOnce(userCredentialToBeCreated);

      jest.spyOn(encryptService, 'encryptString').mockResolvedValueOnce(userCredentialToBeCreated.encryptedPassword);
      jest.spyOn(configService, 'get').mockReturnValueOnce('1234');
      
      // Act
      const result = await usersCredentialsService.createAndEncrypt(userCredentialNotEncrypted);

      // Assert
      expect(result).toBeTruthy()

      expect(encryptService.encryptString).toBeCalledTimes(1);
      expect(encryptService.encryptString).toBeCalledWith(userCredentialNotEncrypted.notEncryptedPassword, '1234');

      expect(configService.get).toBeCalledTimes(1);
      expect(configService.get).toBeCalledWith('AUTH_ENCRYPTION_PASSWORD');

      expect(usersCredentialsRepository.create).toBeCalledTimes(1);
      expect(usersCredentialsRepository.create).toBeCalledWith(userCredentialToBeCreated);
      expect(usersCredentialsRepository.save).toBeCalledTimes(1);
      expect(usersCredentialsRepository.save).toBeCalledWith(userCredentialToBeCreated);

    })

    it('createAndEncrypt, with problems', async () => {
      // Arrange
      const userCredentialToBeCreated = {
        encryptedPassword: '123psw',
        userId: 'ea09da88-99f6-4bc0-b28b-297a6502f02a'
      } as UserCredential

      const userCredentialNotEncrypted = {
        notEncryptedPassword: 'psw123',
        userId: 'ea09da88-99f6-4bc0-b28b-297a6502f02a'
      } as UserCredentialNotEncrypted
      
      // Act
      const result = await usersCredentialsService.createAndEncrypt(userCredentialNotEncrypted);

      // Assert
      expect(result).toBeFalsy()

      expect(encryptService.encryptString).toBeCalledTimes(1);
      expect(configService.get).toBeCalledTimes(1);

      expect(usersCredentialsRepository.create).not.toBeCalled();
      expect(usersCredentialsRepository.save).not.toBeCalled();

    })
  })
});
