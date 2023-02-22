import { Injectable } from '@nestjs/common';
import { PagedGetListResult } from 'rkc.base.back';
import { ProductViewGetListInput } from './dto/product-get-list-input.dto';
import ProductViewOutput from './dto/product-view-output.dto';

@Injectable()
export abstract class IProductViewService {
  public abstract getById(productId: string): Promise<ProductViewOutput | null>;
  public abstract getList(filterInput: ProductViewGetListInput): Promise<PagedGetListResult<ProductViewOutput>>;
}
