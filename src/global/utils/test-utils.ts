import { Category } from 'src/app/category/entities/category.entity';
import { Brand, Gender, Unit } from 'src/global/enums';
import { TestUtilsBase } from 'rkc.base.back';
import Product from '../../app/product/entities/product.entity';

export class TestUtils extends TestUtilsBase {
  public _Categories: Array<Category> = [
    {
      brand: Brand.Demillus,
      id: this.UUIDs[0],
      isActive: true,
      name: this.Strings[0],
    } as Category,
    {
      brand: Brand.Natura,
      id: this.UUIDs[1],
      isActive: false,
      name: this.Strings[1],
    } as Category,
    {
      brand: Brand.Demillus,
      id: this.UUIDs[2],
      isActive: false,
      name: this.Strings[2],
    } as Category,
  ];
  public get Categories(): Array<Category> {
    return this._Categories;
  }

  public _Products: Array<Product> = [
    {
      id: this.UUIDs[0],
      name: this.Strings[0],
      brandCode: this.Strings[9],
      unit: Unit.Unit,
      size: this.Strings[9],
      categoryId: this._Categories[0].id,
      gender: Gender.Indeterminate,
      brand: Brand.Demillus,
      isActive: true,
      image: this.Strings[9],
    } as Product,
    {
      id: this.UUIDs[1],
      name: this.Strings[1],
      brandCode: this.Strings[8],
      unit: Unit.Unit,
      size: this.Strings[8],
      categoryId: this._Categories[1].id,
      gender: Gender.Female,
      brand: Brand.Natura,
      isActive: false,
      image: this.Strings[8],
    } as Product,
    {
      id: this.UUIDs[2],
      name: this.Strings[2],
      brandCode: this.Strings[7],
      unit: Unit.Unit,
      size: this.Strings[7],
      categoryId: this._Categories[2].id,
      gender: Gender.Unisex,
      brand: Brand.Demillus,
      isActive: true,
      image: this.Strings[7],
    } as Product,
  ];
  public get Products(): Array<Product> {
    return this._Products;
  }
}
