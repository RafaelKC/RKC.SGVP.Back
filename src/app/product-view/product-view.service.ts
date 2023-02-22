import { Injectable } from '@nestjs/common';
import { PagedGetListResult } from 'rkc.base.back';
import { CategoryGetAllInput } from '../category/dtos/category-get-all-input.dto';
import { ICategoryService } from '../category/iCategory.service.interface';
import { IProductService } from '../product/IProduct.service.interface';
import { ProductViewGetListInput } from './dto/product-get-list-input.dto';
import ProductViewOutput from './dto/product-view-output.dto';
import { IProductViewService } from './iProduct-view.service.interface';

@Injectable()
export class ProductViewService implements IProductViewService {
  constructor(public readonly _productService: IProductService, public readonly _categoryService: ICategoryService) {}

  public async getById(productId: string): Promise<ProductViewOutput | null> {
    const product = await this._productService.getById(productId);
    if (product == null) return null;

    const category = await this._categoryService.getById(product.categoryId);
    if (category == null) return null;

    return new ProductViewOutput(product, category);
  }
  public async getList(filterInput: ProductViewGetListInput): Promise<PagedGetListResult<ProductViewOutput>> {
    const products = await this._productService.getList(filterInput);
    if (products.totalCount === 0) return { totalCount: 0, itens: {} as Array<ProductViewOutput> };

    const categoriesIds = products.itens.map((product) => product.categoryId);
    const categoriesMap = new Map(
      (
        await this._categoryService.getAll({
          categoriesIds,
          skipResultCount: 0,
          maxResultCount: filterInput.maxResultCount,
          name: filterInput.categoryName,
        } as CategoryGetAllInput)
      ).itens.map((category) => [category.id, category]),
    );
    return {
      itens: products.itens.filter((product) => {
        const category = categoriesMap.get(product.categoryId);
        if (category != null) return new ProductViewOutput(product, category);
        products.totalCount -= 1;
      }),
      totalCount: products.totalCount,
    } as PagedGetListResult<ProductViewOutput>;
  }
}
