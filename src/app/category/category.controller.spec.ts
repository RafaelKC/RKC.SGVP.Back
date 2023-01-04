import { Test, TestingModule } from '@nestjs/testing';
import { PagedGetAllResult } from 'src/global/dtos/paged-get-all-result.dto';
import { Brand } from 'src/global/enums';
import { TestUtils } from 'src/global/utils/test-utils';
import { CategoryController } from './category.controller';
import { CategoryGetAllInput } from './dtos/category-get-all-input.dto';
import { Category } from './entities/category.entity';
import { ICategoryService } from './iCategory.service.interface';

describe('CategoryController', () => {
  const testUtils = new TestUtils();

  let categoryController: CategoryController;
  let categoryService: ICategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: ICategoryService,
          useValue: {
            getById: jest.fn(),
            getAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    categoryController = module.get<CategoryController>(CategoryController);
    categoryService = module.get<ICategoryService>(ICategoryService);
  });

  it('should be defined', () => {
    expect(categoryController).toBeDefined();
    expect(categoryService).toBeDefined();
  });

  describe('testing getById', () => {
    it('getById', async () => {
      // Assert
      jest.spyOn(categoryService, 'getById').mockResolvedValueOnce(testUtils.Categories[0]);
      const response = testUtils.Response;

      // Act
      await categoryController.getById(testUtils.Categories[0].id, response);

      // Arrange
      expect(response.sendDate).toBe(testUtils.Categories[0]);
      expect(response.statusCode).toBe(200);
      expect(categoryService.getById).toBeCalledTimes(1);
      expect(categoryService.getById).toBeCalledWith(testUtils.Categories[0].id);
    });

    it('getById with incorrect id', async () => {
      // Assert
      const response = testUtils.Response;

      // Act
      await categoryController.getById(testUtils.Strings[0], response);

      // Arrange
      expect(response.sendDate).toStrictEqual({ message: 'categoryId must be a valid UUID' });
      expect(response.statusCode).toBe(400);
      expect(categoryService.getById).not.toBeCalled();
    });

    it('getById not found', async () => {
      // Assert
      jest.spyOn(categoryService, 'getById').mockResolvedValueOnce(null);
      const response = testUtils.Response;

      // Act
      await categoryController.getById(testUtils.Categories[0].id, response);

      // Arrange
      expect(response.sendDate).toStrictEqual({ message: 'categoryId not found' });
      expect(response.statusCode).toBe(404);
      expect(categoryService.getById).toBeCalledTimes(1);
      expect(categoryService.getById).toBeCalledWith(testUtils.Categories[0].id);
    });
  });

  describe('testing getAll', () => {
    it('getAll', async () => {
      // Assert
      const expectedResult = {
        totalCount: testUtils.Categories.length,
        itens: testUtils.Categories,
      } as PagedGetAllResult<Category>;

      const getAllInput = new CategoryGetAllInput();
      getAllInput.activesOnly = true;
      getAllInput.brand = Brand.Natura;
      getAllInput.name = testUtils.Strings[0];

      jest.spyOn(categoryService, 'getAll').mockResolvedValueOnce(expectedResult);

      // Act
      const result = await categoryController.getAll(getAllInput);

      // Arrange
      expect(result).toBe(expectedResult);
      expect(categoryService.getAll).toBeCalledTimes(1);
      expect(categoryService.getAll).toBeCalledWith(getAllInput);
    });
  });

  describe('testing create', () => {
    it('getAll', async () => {
      // Assert
      jest.spyOn(categoryService, 'create').mockResolvedValueOnce(testUtils.Categories[0]);

      // Act
      const result = await categoryController.create(testUtils.Categories[0]);

      // Arrange
      expect(result).toBe(testUtils.Categories[0]);
      expect(categoryService.create).toBeCalledTimes(1);
      expect(categoryService.create).toBeCalledWith(testUtils.Categories[0]);
    });
  });

  describe('testing updated', () => {
    it('update', async () => {
      // Assert
      jest.spyOn(categoryService, 'update').mockResolvedValueOnce(true);
      const response = testUtils.Response;

      // Act
      await categoryController.update(testUtils.Categories[0], testUtils.Categories[0].id, response);

      // Arrange
      expect(response.sendDate).toBeUndefined();
      expect(response.statusCode).toBe(200);
      expect(categoryService.update).toBeCalledTimes(1);
      expect(categoryService.update).toBeCalledWith(testUtils.Categories[0].id, testUtils.Categories[0]);
    });

    it('update with invalid id', async () => {
      // Assert
      const response = testUtils.Response;

      // Act
      await categoryController.update(testUtils.Categories[0], testUtils.Strings[0], response);

      // Arrange
      expect(response.sendDate).toStrictEqual({ message: 'categoryId must be a valid UUID' });
      expect(response.statusCode).toBe(400);
      expect(categoryService.update).not.toBeCalled();
    });

    it('update not found', async () => {
      // Assert
      jest.spyOn(categoryService, 'update').mockResolvedValueOnce(false);
      const response = testUtils.Response;

      // Act
      await categoryController.update(testUtils.Categories[0], testUtils.Categories[0].id, response);

      // Arrange
      expect(response.sendDate).toStrictEqual({ message: 'categoryId not found' });
      expect(response.statusCode).toBe(404);
      expect(categoryService.update).toBeCalledTimes(1);
      expect(categoryService.update).toBeCalledWith(testUtils.Categories[0].id, testUtils.Categories[0]);
    });
  });
});
