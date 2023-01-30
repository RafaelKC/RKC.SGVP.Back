import Product from './entities/product.entity';
import { ProductGetListInput } from './dtos/product-get-list-input.dto';
import { PagedGetListResult } from 'rkc.base.back';
import { IProduct } from './entities/iProduct.interface';

export abstract class IProductService {
  public abstract getById(productId: string): Promise<Product | null>;
  public abstract getList(filterInput: ProductGetListInput): Promise<PagedGetListResult<Product>>;
  public abstract create(product: IProduct): Promise<Product | null>;
  public abstract update(productId: string, product: IProduct): Promise<boolean>;
}
