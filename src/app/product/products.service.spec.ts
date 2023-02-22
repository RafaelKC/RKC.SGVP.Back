import { Test, TestingModule } from '@nestjs/testing';
import { TestUtils } from 'src/global/utils/test-utils';
import { ProductService } from './product.service';
import { Repository } from 'typeorm';
import Product from './entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import ProductOutput from './dtos/product-output';
import { ICategoryService } from '../category/iCategory.service.interface';

describe('ProductService', () => {
  const testUtils = new TestUtils();

  let productService: ProductService;
  let categoryService: ICategoryService;
  let productRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            findOneBy: jest.fn(),
            findAndCount: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
            merge: jest.fn(),
          },
        },
        {
          provide: ICategoryService,
          useValue: {
            getById: jest.fn(),
          },
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<Product>>(getRepositoryToken(Product));
    categoryService = module.get<ICategoryService>(ICategoryService);
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
    expect(productService).toBeDefined();
    expect(categoryService).toBeDefined();
  });

  describe('Testing getById', () => {
    it('getById', async () => {
      // Arrange
      jest.spyOn(productRepository, 'findOneBy').mockResolvedValueOnce(testUtils.Products[0]);

      // Act
      const result = await productService.getById(testUtils.Products[0].id);

      // Arrange
      expect(result).toStrictEqual(new ProductOutput(testUtils.Products[0]));
      expect(productRepository.findOneBy).toBeCalledTimes(1);
      expect(productRepository.findOneBy).toBeCalledWith({ id: testUtils.Products[0].id });
    });
  });

  describe('Testing create', () => {
    it('create', async () => {
      // Arrange
      jest.spyOn(productRepository, 'create').mockReturnValueOnce(new Product(testUtils.Products[0]));
      jest.spyOn(productRepository, 'save').mockResolvedValueOnce(testUtils.Products[0]);

      jest.spyOn(categoryService, 'getById').mockResolvedValueOnce(testUtils.Categories[0]);

      // Act
      const result = await productService.create(testUtils.Products[0]);

      // Assert
      expect(result).toStrictEqual(new ProductOutput(testUtils.Products[0]));

      expect(productRepository.save).toBeCalledTimes(1);
      expect(productRepository.save).toBeCalledWith(new Product(testUtils.Products[0]));

      expect(productRepository.create).toBeCalledTimes(1);
      expect(productRepository.create).toBeCalledWith(new Product(testUtils.Products[0]));

      expect(categoryService.getById).toBeCalledTimes(1);
      expect(categoryService.getById).toBeCalledWith(testUtils.Products[0].categoryId);
    });

    it('create with invalid properties', async () => {
      // Act
      const result = await productService.create({} as Product);

      // Assert
      expect(result).toBeNull();

      expect(productRepository.save).not.toBeCalled();
      expect(productRepository.create).not.toBeCalled();
    });
  });

  describe('Testing update', () => {
    it('update', async () => {
      // Arrange
      const ProductDataToUpdate = testUtils.Products[1];
      ProductDataToUpdate.id = testUtils.Products[0].id;

      jest.spyOn(productRepository, 'save').mockResolvedValueOnce(ProductDataToUpdate);
      jest.spyOn(productRepository, 'findOneBy').mockResolvedValueOnce(testUtils.Products[0]);
      jest.spyOn(productRepository, 'merge').mockReturnValueOnce(new Product(ProductDataToUpdate));

      jest.spyOn(categoryService, 'getById').mockResolvedValueOnce(testUtils.Categories[0]);

      // Act
      const result = await productService.update(testUtils.Products[0].id, ProductDataToUpdate);

      // Assert
      expect(result).toBeTruthy;

      expect(productRepository.merge).toBeCalledTimes(1);
      expect(productRepository.merge).toBeCalledWith(testUtils.Products[0], new Product(ProductDataToUpdate));

      expect(productRepository.save).toBeCalledTimes(1);
      expect(productRepository.save).toBeCalledWith(new Product(ProductDataToUpdate));

      expect(productRepository.findOneBy).toBeCalledTimes(1);
      expect(productRepository.findOneBy).toBeCalledWith({ id: testUtils.Products[0].id });

      expect(categoryService.getById).toBeCalledTimes(1);
      expect(categoryService.getById).toBeCalledWith(ProductDataToUpdate.categoryId);
    });

    it('update with invalid properties', async () => {
      // Act
      const result = await productService.update(testUtils.UUIDs[0], {} as Product);

      // Assert
      expect(result).toBeFalsy();

      expect(productRepository.merge).not.toBeCalled();
      expect(productRepository.save).not.toBeCalled();
    });
  });
});
