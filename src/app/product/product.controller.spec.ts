import { Test, TestingModule } from '@nestjs/testing';
import { PagedGetListResult } from 'rkc.base.back';
import { Brand } from 'src/global/enums';
import { TestUtils } from 'src/global/utils/test-utils';
import { ProductGetListInput } from './dtos/product-get-list-input.dto';
import Product from './entities/product.entity';
import { IProductService } from './IProduct.service.interface';
import { ProductController } from './product.controller';

describe('ProductController', () => {
  const testUtils = new TestUtils();

  let productController: ProductController;
  let productService: IProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: IProductService,
          useValue: {
            getById: jest.fn(),
            getList: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    productController = module.get<ProductController>(ProductController);
    productService = module.get<IProductService>(IProductService);
  });

  it('should be defined', () => {
    expect(productController).toBeDefined();
    expect(productService).toBeDefined();
  });

  describe('testing getById', () => {
    it('getById', async () => {
      // Assert
      jest.spyOn(productService, 'getById').mockResolvedValueOnce(testUtils.Products[0]);
      const response = testUtils.Response;

      // Act
      await productController.getById(testUtils.Products[0].id, response);

      // Arrange
      expect(response.sendDate).toBe(testUtils.Products[0]);
      expect(response.statusCode).toBe(200);
      expect(productService.getById).toBeCalledTimes(1);
      expect(productService.getById).toBeCalledWith(testUtils.Products[0].id);
    });

    it('getById with incorrect id', async () => {
      // Assert
      const response = testUtils.Response;

      // Act
      await productController.getById(testUtils.Strings[0], response);

      // Arrange
      expect(response.sendDate).toStrictEqual({ message: 'productId must be a valid UUID' });
      expect(response.statusCode).toBe(400);
      expect(productService.getById).not.toBeCalled();
    });

    it('getById not found', async () => {
      // Assert
      jest.spyOn(productService, 'getById').mockResolvedValueOnce(null);
      const response = testUtils.Response;

      // Act
      await productController.getById(testUtils.Products[0].id, response);

      // Arrange
      expect(response.sendDate).toStrictEqual({ message: 'productId not found' });
      expect(response.statusCode).toBe(404);
      expect(productService.getById).toBeCalledTimes(1);
      expect(productService.getById).toBeCalledWith(testUtils.Products[0].id);
    });
  });

  describe('testing getList', () => {
    it('getList', async () => {
      // Assert
      const expectedResult = {
        totalCount: testUtils.Products.length,
        itens: testUtils.Products,
      } as PagedGetListResult<Product>;

      const getListInput = new ProductGetListInput();
      getListInput.activesOnly = true;
      getListInput.brand = Brand.Natura;
      getListInput.name = testUtils.Strings[0];

      jest.spyOn(productService, 'getList').mockResolvedValueOnce(expectedResult);

      // Act
      const result = await productController.getList(getListInput);

      // Arrange
      expect(result).toBe(expectedResult);
      expect(productService.getList).toBeCalledTimes(1);
      expect(productService.getList).toBeCalledWith(getListInput);
    });
  });

  describe('testing create', () => {
    it('getList', async () => {
      // Assert
      jest.spyOn(productService, 'create').mockResolvedValueOnce(testUtils.Products[0]);

      // Act
      const result = await productController.create(testUtils.Products[0]);

      // Arrange
      expect(result).toBe(testUtils.Products[0]);
      expect(productService.create).toBeCalledTimes(1);
      expect(productService.create).toBeCalledWith(testUtils.Products[0]);
    });
  });

  describe('testing updated', () => {
    it('update', async () => {
      // Assert
      jest.spyOn(productService, 'update').mockResolvedValueOnce(true);
      const response = testUtils.Response;

      // Act
      await productController.update(testUtils.Products[0], testUtils.Products[0].id, response);

      // Arrange
      expect(response.sendDate).toBeUndefined();
      expect(response.statusCode).toBe(200);
      expect(productService.update).toBeCalledTimes(1);
      expect(productService.update).toBeCalledWith(testUtils.Products[0].id, testUtils.Products[0]);
    });

    it('update with invalid id', async () => {
      // Assert
      const response = testUtils.Response;

      // Act
      await productController.update(testUtils.Products[0], testUtils.Strings[0], response);

      // Arrange
      expect(response.sendDate).toStrictEqual({ message: 'productId must be a valid UUID' });
      expect(response.statusCode).toBe(400);
      expect(productService.update).not.toBeCalled();
    });

    it('update not found', async () => {
      // Assert
      jest.spyOn(productService, 'update').mockResolvedValueOnce(false);
      const response = testUtils.Response;

      // Act
      await productController.update(testUtils.Products[0], testUtils.Products[0].id, response);

      // Arrange
      expect(response.sendDate).toStrictEqual({ message: 'productId not found' });
      expect(response.statusCode).toBe(404);
      expect(productService.update).toBeCalledTimes(1);
      expect(productService.update).toBeCalledWith(testUtils.Products[0].id, testUtils.Products[0]);
    });
  });
});
