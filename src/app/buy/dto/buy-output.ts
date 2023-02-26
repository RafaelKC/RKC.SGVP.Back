import { Brand } from 'src/global/enums';
import Buy from '../entities/buy.entity';

export default class BuyOutput {
  public id: string;
  public quantityItens: number;
  public quantityProducts: number;
  public totalValue: number;
  public buyDate: Date;
  public brand: Brand;

  constructor(buy: Buy) {
    this.id = buy.id;
    this.quantityItens = buy.quantityItens;
    this.quantityProducts = buy.quantityProducts;
    this.totalValue = buy.totalValue;
    this.buyDate = buy.buyDate;
    this.brand = buy.brand;
  }
}
