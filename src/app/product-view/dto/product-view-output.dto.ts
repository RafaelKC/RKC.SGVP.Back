import { Category } from 'src/app/category/entities/category.entity';
import { ICategory } from 'src/app/category/entities/iCategory.interface';
import { IProduct } from 'src/app/product/entities/iProduct.interface';
import Product from 'src/app/product/entities/product.entity';
import { Brand, Gender, Unit } from 'src/global/enums';
import ProductOutput from '../../product/dtos/product-output';

export default class ProductViewOutput implements IProduct, ICategory {
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
  public categoryName: string;

  constructor(product: ProductOutput, category: Category) {
    this.id = product.id;
    this.name = product.name;
    this.unit = product.unit;
    this.brandCode = product.brandCode;
    this.size = product.size;
    this.categoryId = category.id;
    this.gender = product.gender;
    this.isActive = product.isActive;
    this.image = product.image;
    this.brand = product.brand;
    this.categoryName = category.name;
  }
}
