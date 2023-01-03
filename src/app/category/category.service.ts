import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { CategoryGetAllInput } from './dtos/category-get-all-input.dto';
import { Category } from './entities/category.entity';
import { ICategory } from './entities/iCategory.interface';
import { ICategoryService } from './iCategory.service.interface';
import { PagedGetAllResult } from 'src/global/dtos/paged-get-all-result.dto';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly _categoryRepository: Repository<Category>,
  ) {}

  public async getById(categoryId: string): Promise<Category | null> {
    return await this._categoryRepository.findOneBy({ id: categoryId });
  }

  public async getAll(filterInput: CategoryGetAllInput): Promise<PagedGetAllResult<Category>> {
    const result = await this._categoryRepository.findAndCount({
      skip: filterInput.skipResultCount,
      take: filterInput.maxResultCount,
      where: {
        brand: filterInput.brand,
        isActive: filterInput.activesOnly ?? undefined,
        name: Boolean(filterInput.name)
          ? Raw((name) => `LOWER(${name}) LIKE '%${filterInput.name.toLowerCase()}%'`)
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

  public async update(categoryId: string, category: ICategory): Promise<boolean> {
    if (category.brand == null || !category.name || !categoryId) {
      return false;
    }

    const updateResult = await this._categoryRepository
      .createQueryBuilder('category')
      .update()
      .set({
        brand: category.brand,
        name: category.name,
        isActive: category.isActive,
      })
      .where(`id = '${categoryId}'`)
      .execute();

    return Boolean(updateResult.affected);
  }
}
