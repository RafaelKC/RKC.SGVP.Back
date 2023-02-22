import { Test, TestingModule } from '@nestjs/testing';
import { TestUtils } from 'src/global/utils/test-utils';
import { ProductViewService } from './product-view.service';
import { IProductService } from '../product/IProduct.service.interface';
import { ICategoryService } from '../category/iCategory.service.interface';
import ProductViewOutput from './dto/product-view-output.dto';
import { ProductViewGetListInput } from './dto/product-get-list-input.dto';
import { PagedGetListResult } from 'rkc.base.back';
import { Category } from 'src/app/category/entities/category.entity';
import ProductOutput from '../product/dtos/product-output';
import { CategoryGetAllInput } from '../category/dtos/category-get-all-input.dto';

describe('ProductViewService', () => {
  const testUtils = new TestUtils();

  let productService: IProductService;
  let categoryService: ICategoryService;
  let productViewService: ProductViewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductViewService,
        {
          provide: IProductService,
          useValue: {
            getById: jest.fn(),
            getList: jest.fn(),
          },
        },
        {
          provide: ICategoryService,
          useValue: {
            getById: jest.fn(),
            getAll: jest.fn(),
          },
        },
      ],
    }).compile();

    productService = module.get<IProductService>(IProductService);
    categoryService = module.get<ICategoryService>(ICategoryService);
    productViewService = module.get<ProductViewService>(ProductViewService);
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
    expect(categoryService).toBeDefined();
    expect(productViewService).toBeDefined();
  });

  describe('Testing getById', () => {
    it('getById', async () => {
      // Arrange
      jest.spyOn(categoryService, 'getById').mockResolvedValueOnce(testUtils.Categories[0]);
      jest.spyOn(productService, 'getById').mockResolvedValueOnce(testUtils.Products[0]);

      // Act
      const result = await productViewService.getById(testUtils.Products[0].id);

      // Arrange
      expect(result).toStrictEqual(new ProductViewOutput(testUtils.Products[0], testUtils.Categories[0]));

      expect(productService.getById).toBeCalledTimes(1);
      expect(productService.getById).toBeCalledWith(testUtils.Products[0].id);

      expect(categoryService.getById).toBeCalledTimes(1);
      expect(categoryService.getById).toBeCalledWith(testUtils.Products[0].categoryId);
    });
  });

  describe('Testing getList', () => {
    it('getList', async () => {
      // Arrange
      const getListInput = {
        name: testUtils.Strings[0],
      } as ProductViewGetListInput;

      jest.spyOn(categoryService, 'getAll').mockResolvedValueOnce({
        itens: testUtils.Categories,
        totalCount: testUtils.Categories.length,
      } as PagedGetListResult<Category>);
      jest.spyOn(productService, 'getList').mockResolvedValueOnce({
        itens: testUtils.Products.map((product) => new ProductOutput(product)),
        totalCount: testUtils.Categories.length,
      } as PagedGetListResult<ProductOutput>);

      // Act
      const result = await productViewService.getList(getListInput);

      // Arrange
      expect(productService.getList).toBeCalledTimes(1);
      expect(productService.getList).toBeCalledWith(getListInput);

      expect(categoryService.getAll).toBeCalledTimes(1);
      expect(categoryService.getAll).toBeCalledWith({
        categoriesIds: testUtils.Products.map((prod) => prod.categoryId),
        skipResultCount: 0,
        maxResultCount: getListInput.maxResultCount,
        name: getListInput.categoryName,
      } as CategoryGetAllInput);
    });
  });
});
