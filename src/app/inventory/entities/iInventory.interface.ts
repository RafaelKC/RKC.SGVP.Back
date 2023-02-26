import Buy from 'src/app/buy/entities/buy.entity';

export abstract class IInventory {
  public productId: string;
  public buy: Buy;
  public buyPrice: number;
  public buyQuantity: number;
  public currentQuantity: number;
  public forecastPrice: number;
  public inInventory: boolean;
}
