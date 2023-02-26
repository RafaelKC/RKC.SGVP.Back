import { BaseEntity } from 'rkc.base.back';
import { IInventory } from './iInventory.interface';
import { Column, Entity, ManyToOne } from 'typeorm';
import Buy from '../../buy/entities/buy.entity';

@Entity('inventory')
export default class Inventory extends BaseEntity implements IInventory {
  @Column({ nullable: false, name: 'product_id', type: 'uuid' })
  public productId: string;
  @Column({ nullable: false, name: 'buy_price' })
  public buyPrice: number;
  @Column({ nullable: false, name: 'buy_quantity' })
  public buyQuantity: number;
  @Column({ nullable: false, name: 'current_quantity' })
  public currentQuantity: number;
  @Column({ nullable: false, name: 'forecast_price' })
  public forecastPrice: number;
  @Column({ nullable: false, name: 'in_inventory' })
  public inInventory: boolean;
  @ManyToOne(() => Buy, (buy) => buy.items)
  public buy: Buy;

  constructor(inventory?: Partial<IInventory>) {
    super();
    if (inventory?.productId) this.productId = inventory.productId;
    if (inventory?.buyPrice) this.buyPrice = inventory.buyPrice;
    if (inventory?.buyQuantity) this.buyQuantity = inventory.buyQuantity;
    if (inventory?.forecastPrice) this.forecastPrice = inventory.forecastPrice;
    if (inventory?.inInventory) this.inInventory = inventory.inInventory;
  }
}
