import { PagedGetListResult } from 'rkc.base.back';
import { BuyGetListInput } from './dto/buy-get-list-input.dto';
import { BuyInput } from './dto/BuyInput';
import Buy from './entities/buy.entity';

export abstract class IBuyService {
  public abstract getById(buyId: string): Promise<Buy | null>;
  public abstract getAll(filterInput: BuyGetListInput): Promise<PagedGetListResult<Buy>>;
  public abstract create(buy: BuyInput): Promise<Buy | null>;
}
