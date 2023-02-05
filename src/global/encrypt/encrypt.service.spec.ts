import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { EncryptService } from './encrypt.service';

describe('EncryptService', () => {
  let encryptService: EncryptService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EncryptService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    configService = module.get<ConfigService>(ConfigService);
    encryptService = module.get<EncryptService>(EncryptService);
  });

  it('should be defined', () => {
    expect(encryptService).toBeDefined();
    expect(configService).toBeDefined();
  });
});
