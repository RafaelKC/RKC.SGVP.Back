import { ProductGetListInput } from './dtos/product-get-list-input.dto';
import { PagedGetListResult } from 'rkc.base.back';
import { IProduct } from './entities/iProduct.interface';
import ProductOutput from './dtos/product-output';

export abstract class IProductService {
  public abstract getById(productId: string): Promise<ProductOutput | null>;
  public abstract getList(filterInput: ProductGetListInput): Promise<PagedGetListResult<ProductOutput>>;
  public abstract create(product: IProduct): Promise<ProductOutput | null>;
  public abstract update(productId: string, product: IProduct): Promise<boolean>;
}
