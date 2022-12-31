import { Test, TestingModule } from '@nestjs/testing';
import { EncryptService } from './encrypt.service';

describe('EncryptService', () => {
  let encryptService: EncryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncryptService],
    }).compile();

    encryptService = module.get<EncryptService>(EncryptService);
  });

  it('should be defined', () => {
    expect(encryptService).toBeDefined();
  });

  describe('Testing methods', () => {
    it('encryptString, should return a correct encrypted string', async () => {
      // Arrange
      const password = '94ce90a8909d255fc82781772dd33595d14bac84';
      const stringToEncrypt = '404, not found';

      // Act
      const result = await encryptService.encryptString(stringToEncrypt, password);

      // Assert
      console.log(result);
      expect(result).toBeTruthy();
    })
  })
});
