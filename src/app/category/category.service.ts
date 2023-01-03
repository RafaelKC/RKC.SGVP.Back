import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryGetAllInput } from './dtos/category-get-all-input.dto';
import { Category } from './entities/category.entity';
import { ICategory } from './entities/iCategory.interface';
import { ICategoryService } from './iCategory.service.interface';
import { paginateResult } from 'src/global/functions/paginateResult.function';
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
    let query = this._categoryRepository.createQueryBuilder('category');

    // const brandFilter = `category.brand = ${filterInput.brand}`;
    // const nameFilter = `LOWER(category.name) like %${filterInput.name.toLocaleLowerCase()}%`;
    // let whereFilter = '';

    // if (filterInput.filterByBrand && filterInput.filterByName) {
    //   whereFilter = `${brandFilter} AND ${nameFilter}`;
    // } else if (filterInput.filterByBrand) {
    //   whereFilter = brandFilter;
    // } else if (filterInput.filterByName) {
    //   whereFilter = nameFilter;
    // }
    // query = query.where(whereFilter);

    query = filterInput.activesOnly ? query.where(`category.is_active = 1`) : query;
    query = filterInput.filterByBrand ? query.where(`category.brand = ${filterInput.brand}`) : query;
    query = filterInput.filterByName
      ? query.where(`LOWER(category.name) like %${filterInput.name.toLocaleLowerCase()}%`)
      : query;

    return {
      totalCount: await query.getCount(),
      itens: await paginateResult(query, filterInput).getMany(),
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
      .where(`id = ${categoryId}`)
      .execute();

    return Boolean(updateResult.affected);
  }
}
