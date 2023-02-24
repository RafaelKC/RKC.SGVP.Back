import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { Repository } from 'typeorm';
import { Category } from 'src/app/category/entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestUtils } from '../../global/utils/test-utils';
import { PagedGetListResult } from 'rkc.base.back';
import ProductOutput from '../product/dtos/product-output';
import { ProductGetListInput } from '../product/dtos/product-get-list-input.dto';
import Product from '../product/entities/product.entity';

describe('CategoryService', () => {
  const testUtils = new TestUtils();

  let categoryService: CategoryService;
  let categoryRepository: Repository<Category>;
  let productRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useValue: {
            findOneBy: jest.fn(),
            findAndCount: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
            merge: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Product),
          useValue: {
            countBy: jest.fn(),
          },
        },
      ],
    }).compile();

    categoryService = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<Repository<Category>>(getRepositoryToken(Category));
    productRepository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(categoryService).toBeDefined();
    expect(categoryRepository).toBeDefined();
  });

  describe('Testing getById', () => {
    it('getById', async () => {
      // Arrange
      jest.spyOn(categoryRepository, 'findOneBy').mockResolvedValueOnce(testUtils.Categories[0]);

      // Act
      const result = await categoryService.getById(testUtils.Categories[0].id);

      // Assert
      expect(result).toBe(testUtils.Categories[0]);
      expect(categoryRepository.findOneBy).toBeCalledTimes(1);
      expect(categoryRepository.findOneBy).toBeCalledWith({ id: testUtils.Categories[0].id });
    });
  });

  describe('Testing create', () => {
    it('create', async () => {
      // Arrange
      jest.spyOn(categoryRepository, 'create').mockReturnValue(testUtils.Categories[0]);
      jest.spyOn(categoryRepository, 'save').mockResolvedValueOnce(testUtils.Categories[0]);

      // Act
      const result = await categoryService.create(testUtils.Categories[0]);

      // Assert
      expect(result).toStrictEqual(testUtils.Categories[0]);

      expect(categoryRepository.save).toBeCalledTimes(1);
      expect(categoryRepository.save).toBeCalledWith(testUtils.Categories[0]);

      expect(categoryRepository.create).toBeCalledTimes(1);
      expect(categoryRepository.create).toBeCalledWith(testUtils.Categories[0]);
    });

    it('create with invalid properties', async () => {
      // Act
      const result = await categoryService.create({} as Category);

      // Assert
      expect(result).toBeNull();

      expect(categoryRepository.save).not.toBeCalled();
      expect(categoryRepository.create).not.toBeCalled();
    });
  });

  describe('Testing update', () => {
    it('update', async () => {
      // Arrange
      const categoryDataToUpdate = testUtils.Categories[1];
      categoryDataToUpdate.id = testUtils.Categories[0].id;

      jest.spyOn(categoryRepository, 'save').mockResolvedValueOnce(categoryDataToUpdate);
      jest.spyOn(categoryRepository, 'findOneBy').mockResolvedValueOnce(testUtils.Categories[0]);
      jest.spyOn(categoryRepository, 'merge').mockReturnValueOnce(categoryDataToUpdate);

      // Act
      const result = await categoryService.update(testUtils.Categories[0].id, categoryDataToUpdate);

      // Assert
      expect(result).toBeTruthy;

      expect(categoryRepository.merge).toBeCalledTimes(1);
      expect(categoryRepository.merge).toBeCalledWith(testUtils.Categories[0], categoryDataToUpdate);

      expect(categoryRepository.save).toBeCalledTimes(1);
      expect(categoryRepository.save).toBeCalledWith(categoryDataToUpdate);

      expect(categoryRepository.findOneBy).toBeCalledTimes(1);
      expect(categoryRepository.findOneBy).toBeCalledWith({ id: testUtils.Categories[0].id });
    });

    it('update with invalid properties', async () => {
      // Act
      const result = await categoryService.update(testUtils.UUIDs[0], {} as Category);

      // Assert
      expect(result).toBeFalsy();

      expect(categoryRepository.merge).not.toBeCalled();
      expect(categoryRepository.save).not.toBeCalled();
    });
  });

  describe('Testing delete', () => {
    it('delete', async () => {
      // Arrange
      const categoryDataToUpdate = testUtils.Categories[1];
      categoryDataToUpdate.id = testUtils.Categories[0].id;

      jest.spyOn(categoryRepository, 'findOneBy').mockResolvedValueOnce(testUtils.Categories[0]);
      jest.spyOn(categoryRepository, 'remove').mockResolvedValueOnce(testUtils.Categories[0]);
      jest.spyOn(productRepository, 'countBy').mockResolvedValueOnce(0);

      // Act
      const result = await categoryService.delete(testUtils.Categories[0].id);

      // Assert
      expect(result).toBeTruthy;

      expect(categoryRepository.findOneBy).toBeCalledTimes(1);
      expect(categoryRepository.findOneBy).toBeCalledWith({ id: testUtils.Categories[0].id });

      expect(categoryRepository.remove).toBeCalledTimes(1);
      expect(categoryRepository.remove).toBeCalledWith(testUtils.Categories[0]);

      expect(productRepository.countBy).toBeCalledTimes(1);
      expect(productRepository.countBy).toBeCalledWith({ categoryId: testUtils.Categories[0].id });
    });
  });
});
