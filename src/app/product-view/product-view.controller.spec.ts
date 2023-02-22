import { Test, TestingModule } from '@nestjs/testing';
import { PagedGetListResult } from 'rkc.base.back';
import { Brand } from 'src/global/enums';
import { TestUtils } from 'src/global/utils/test-utils';
import ProductOutput from '../product/dtos/product-output';
import { ProductViewGetListInput } from './dto/product-get-list-input.dto';
import ProductViewOutput from './dto/product-view-output.dto';
import { IProductViewService } from './iProduct-view.service.interface';
import { ProductViewController } from './product-view.controller';

describe('ProductViewController', () => {
  const testUtils = new TestUtils();

  let productViewController: ProductViewController;
  let productViewService: IProductViewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductViewController],
      providers: [
        {
          provide: IProductViewService,
          useValue: {
            getById: jest.fn(),
            getList: jest.fn(),
          },
        },
      ],
    }).compile();

    productViewController = module.get<ProductViewController>(ProductViewController);
    productViewService = module.get<IProductViewService>(IProductViewService);
  });

  it('should be defined', () => {
    expect(productViewController).toBeDefined();
    expect(productViewService).toBeDefined();
  });

  describe('testing getById', () => {
    it('getById', async () => {
      // Assert
      const productView = new ProductViewOutput(new ProductOutput(testUtils.Products[0]), testUtils.Categories[0]);

      jest.spyOn(productViewService, 'getById').mockResolvedValueOnce(productView);
      const response = testUtils.Response;

      // Act
      await productViewController.getById(testUtils.Products[0].id, response);

      // Arrange
      expect(response.sendDate).toBe(productView);
      expect(response.statusCode).toBe(200);
      expect(productViewService.getById).toBeCalledTimes(1);
      expect(productViewService.getById).toBeCalledWith(testUtils.Products[0].id);
    });

    it('getById with incorrect id', async () => {
      // Assert
      const response = testUtils.Response;

      // Act
      await productViewController.getById(testUtils.Strings[0], response);

      // Arrange
      expect(response.sendDate).toStrictEqual({ message: 'productId must be a valid UUID' });
      expect(response.statusCode).toBe(400);
      expect(productViewService.getById).not.toBeCalled();
    });

    it('getById not found', async () => {
      // Assert
      jest.spyOn(productViewService, 'getById').mockResolvedValueOnce(null);
      const response = testUtils.Response;

      // Act
      await productViewController.getById(testUtils.Products[0].id, response);

      // Arrange
      expect(response.sendDate).toStrictEqual({ message: 'productId not found' });
      expect(response.statusCode).toBe(404);
      expect(productViewService.getById).toBeCalledTimes(1);
      expect(productViewService.getById).toBeCalledWith(testUtils.Products[0].id);
    });
  });

  describe('testing getList', () => {
    it('getList', async () => {
      // Assert
      const expectedResult = {
        totalCount: testUtils.Products.length,
        itens: testUtils.Products.map((prod) => new ProductViewOutput(prod, testUtils.Categories[0])),
      } as PagedGetListResult<ProductViewOutput>;

      const getListInput = new ProductViewGetListInput();
      getListInput.activesOnly = true;
      getListInput.brand = Brand.Natura;
      getListInput.name = testUtils.Strings[0];

      jest.spyOn(productViewService, 'getList').mockResolvedValueOnce(expectedResult);

      // Act
      const result = await productViewController.getList(getListInput);

      // Arrange
      expect(result).toBe(expectedResult);
      expect(productViewService.getList).toBeCalledTimes(1);
      expect(productViewService.getList).toBeCalledWith(getListInput);
    });
  });
});
