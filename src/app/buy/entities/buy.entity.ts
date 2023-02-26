import { BaseEntity } from 'rkc.base.back';
import { Brand } from 'src/global/enums';
import { IBuy } from './iBuy.interface';

export class Buy extends BaseEntity implements IBuy {
  public quantityItens: number;
  public quantityProducts: number;
  public totalValue: number;
  public buyDate: Date;
  public brand: Brand;
  public createdDate: Date;
  public updatedDate: Date;
}
