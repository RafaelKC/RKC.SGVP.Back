import { BaseEntity } from 'rkc.base.back';
import { IInventory } from './iInventory.interface';
import { BeforeSoftRemove, Column, CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity('inventory')
export default class Inventory extends BaseEntity implements IInventory {
  @Column({ nullable: false, name: 'product_id', type: 'uuid' })
  public productId: string;
  @Column({ nullable: false, name: 'buy_id', type: 'uuid' })
  public buyId: string;
  @Column({ nullable: false, name: 'buy_price' })
  public buyPrice: number;
  @Column({ nullable: false, name: 'quantity' })
  public quantity: number;
  @Column({ nullable: false, name: 'forecast_price' })
  public forecastPrice: number;
  @Column({ nullable: false, name: 'in_inventory' })
  public inInventory: boolean;
  @CreateDateColumn()
  public createDate: Date;
  @UpdateDateColumn()
  public updateDate: Date;
  @DeleteDateColumn()
  public deleteDate: Date;
  @Column({ nullable: false, name: 'is_deleted', default: false })
  public isDeleted: boolean;

  @BeforeSoftRemove()
  private setDeleted(): void {
    this.isDeleted = false;
  }
  constructor(inventory?: Partial<IInventory>) {
    super();
    if (inventory?.productId) this.productId = inventory.productId;
    if (inventory?.buyId) this.buyId = inventory.buyId;
    if (inventory?.buyPrice) this.buyPrice = inventory.buyPrice;
    if (inventory?.quantity) this.quantity = inventory.quantity;
    if (inventory?.forecastPrice) this.forecastPrice = inventory.forecastPrice;
    if (inventory?.inInventory) this.inInventory = inventory.inInventory;
  }
}
