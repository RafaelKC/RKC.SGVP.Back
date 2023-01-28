import { Category } from 'src/app/category/entities/category.entity';
import { Brand } from 'src/global/enums';
import { TestUtilsBase } from 'rkc.base.back';

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
}
