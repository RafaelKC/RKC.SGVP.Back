import { Brand } from 'src/global/enums';

export abstract class IBuy {
  public quantityItens: number;
  public quantityProducts: number;
  public totalValue: number;
  public buyDate: Date;
  public brand: Brand;
  // public items: Array<Inventory>;
  public createdDate: Date;
  public updatedDate: Date;
}
