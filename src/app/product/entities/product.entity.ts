import { BaseEntity } from 'rkc.base.back';
import { Unit, Gender, Brand } from 'src/global/enums';
import { Column, Entity } from 'typeorm';
import { IProduct } from './iProduct.interface';

@Entity('product')
export default class Product extends BaseEntity implements IProduct {
  @Column({ nullable: false })
  public name: string;
  @Column({ nullable: false })
  public brandCode: string;
  @Column({ enum: Unit, nullable: false })
  public unit: Unit;
  @Column({ nullable: false, name: 'size' })
  private _size: string;
  @Column({ nullable: false, name: 'category_id', type: 'uuid' })
  public categoryId: string;
  @Column({ enum: Gender, nullable: false })
  public gender: Gender;
  @Column({ enum: Brand, nullable: false })
  public brand: Brand;
  @Column({ nullable: true, name: 'is_active' })
  public isActive: boolean;
  @Column({ nullable: true })
  public image: string;

  get size(): string {
    return this._size;
  }

  set size(size: string | number) {
    if (this.unit === Unit.Unit) {
      this._size = String(size);
    } else {
      if (!isNaN(Number(size))) {
        this._size = String(size);
      } else {
        throw new TypeError('When Product.unit is not Unit.Unit, Product.size must be a number');
      }
    }
  }

  constructor(product?: Partial<IProduct>) {
    super();
    if (typeof product?.gender === 'number') this.gender = product.gender;
    if (typeof product?.brand === 'number') this.brand = product.brand;
    if (typeof product?.unit === 'number') this.unit = product.unit;
    if (product?.brandCode) this.brandCode = product?.brandCode;
    if (product?.categoryId) this.categoryId = product.categoryId;
    if (product?.image) this.image = product.image;
    if (product?.name) this.name = product.name;
    if (product?.size) this.size = product.size;
    if (product?.isActive) {
      this.isActive = product.isActive;
    } else {
      this.isActive = true;
    }
  }
}
