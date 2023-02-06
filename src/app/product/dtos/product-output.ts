import { Unit, Gender, Brand } from 'src/global/enums';
import { IProduct } from '../entities/iProduct.interface';
import Product from '../entities/product.entity';

export default class ProductOutput implements IProduct {
  public id: string;
  public name: string;
  public brandCode: string;
  public unit: Unit;
  public size: string | number;
  public categoryId: string;
  public gender: Gender;
  public brand: Brand;
  public isActive: boolean;
  public image: string;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.unit = product.unit;
    this.brandCode = product.brandCode;
    this.size = product.size;
    this.categoryId = product.categoryId;
    this.gender = product.gender;
    this.isActive = product.isActive;
    this.image = product.image;
    this.brand = product.brand;
  }
}
