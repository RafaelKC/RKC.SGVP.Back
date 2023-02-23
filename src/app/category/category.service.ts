import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PagedGetListResult } from 'rkc.base.back';
import { Raw, Repository } from 'typeorm';
import { IProductService } from '../product/IProduct.service.interface';
import { CategoryGetAllInput } from './dtos/category-get-all-input.dto';
import { Category } from './entities/category.entity';
import { ICategory } from './entities/iCategory.interface';
import { ICategoryService } from './iCategory.service.interface';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly _categoryRepository: Repository<Category>,
    private readonly _productService: IProductService,
  ) {}

  public async getById(categoryId: string): Promise<Category | null> {
    return await this._categoryRepository.findOneBy({ id: categoryId });
  }

  public async getAll(filterInput: CategoryGetAllInput): Promise<PagedGetListResult<Category>> {
    const result = await this._categoryRepository.findAndCount({
      skip: filterInput.skipResultCount,
      take: filterInput.maxResultCount,
      where: {
        brand: filterInput.brand,
        isActive: filterInput.activesOnly ?? undefined,
        name: Boolean(filterInput.name)
          ? Raw((name) => `LOWER(${name}) LIKE '%${filterInput.name.toLowerCase()}%'`)
          : undefined,
        id: Boolean(filterInput.categoriesIds)
          ? Raw((id) => `${id} IN (:...categoriesIds)`, {
              categoriesIds: filterInput.categoriesIds,
            })
          : undefined,
      },
    });

    return {
      totalCount: result[1],
      itens: result[0],
    };
  }

  public async create(category: ICategory): Promise<Category | null> {
    if (category.brand == null || !category.name) {
      return null;
    }

    return await this._categoryRepository.save(this._categoryRepository.create(category));
  }

  public async update(categoryId: string, categoryToUpdate: ICategory): Promise<boolean> {
    if (categoryToUpdate.brand == null || !categoryToUpdate.name || !categoryId) {
      return false;
    }

    const category = await this.getById(categoryId);
    if (!category) return false;

    this._categoryRepository.save(this._categoryRepository.merge(category, categoryToUpdate));

    return true;
  }

  public async delete(categoryId: string): Promise<boolean> {
    const category = await this.getById(categoryId);
    if (category == null) return false;

    const productWithCategoryIdCount = (
      await this._productService.getList({
        categoriesIds: [categoryId],
        activesOnly: false,
        maxResultCount: 1,
        skipResultCount: 0,
      })
    ).totalCount;
    if (productWithCategoryIdCount > 0) return false;

    await this._categoryRepository.remove(category);
    return true;
  }
}
