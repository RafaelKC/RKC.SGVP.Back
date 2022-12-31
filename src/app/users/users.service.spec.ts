import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'rkc.base.back';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        }
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  describe('create', () => {
    it('should save a new user with success', async () => {
      // Arrange
      const userToBeCreated = {
        firstName: 'Jon',
        lastName: ' Gates',
        username: 'jonGates',
        email: 'jonGates@mail.com',
        isActive: true,
      } as User

      jest.spyOn(usersRepository, 'create').mockReturnValueOnce(userToBeCreated)
      jest.spyOn(usersRepository, 'save').mockResolvedValueOnce(userToBeCreated)

      // Act
      const result = await usersService.create(new User());  

      // Assert
      expect(result).toBeTruthy();
      expect(usersRepository.create).toBeCalledTimes(1);
      expect(usersRepository.save).toBeCalledTimes(1);
    })
  })

});
