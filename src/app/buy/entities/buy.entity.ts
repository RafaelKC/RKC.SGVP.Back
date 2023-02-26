import { BaseEntity } from 'rkc.base.back';
import Inventory from 'src/app/inventory/entities/inventory.entity';
import { Brand } from 'src/global/enums';
import { IBuy } from './iBuy.interface';
import { Column, OneToMany } from 'typeorm';

export default class Buy extends BaseEntity implements IBuy {
  @OneToMany(() => Inventory, (inventory) => inventory.buy)
  public items: Array<Inventory>;
  @Column({ name: 'buy_date', nullable: false })
  public buyDate: Date;
  @Column({ enum: Brand, nullable: false })
  public brand: Brand;

  public get quantityItens(): number {
    let quantity = 0;
    this.items.forEach((item) => {
      quantity += item.buyQuantity;
    });
    return quantity;
  }

  public get quantityProducts(): number {
    return this.items.length;
  }

  public get totalValue(): number {
    let value = 0;
    this.items.forEach((item) => {
      value += item.buyQuantity * item.buyPrice;
    });
    return value;
  }

  constructor(buy?: Partial<IBuy>) {
    super();
    if (buy?.brand) this.brand = buy.brand;
    if (buy?.items) this.items = buy.items;
    if (buy?.buyDate) this.buyDate = buy.buyDate;
  }
}
