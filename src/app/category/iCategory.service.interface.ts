import { Category } from './entities/category.entity';
import { CategoryGetAllInput } from './dtos/category-get-all-input.dto';
import { ICategory } from './entities/iCategory.interface';
import { PagedGetAllResult } from 'src/global/dtos/paged-get-all-result.dto';

export abstract class ICategoryService {
  public abstract getById(categoryId: string): Promise<Category | null>;
  public abstract getAll(filterInput: CategoryGetAllInput): Promise<PagedGetAllResult<Category>>;
  public abstract create(category: ICategory): Promise<Category | null>;
  public abstract update(categoryId: string, category: ICategory): Promise<boolean>;
}
