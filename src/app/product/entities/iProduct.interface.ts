import { Brand, Gender, Unit } from 'src/global/enums';
export abstract class IProduct {
  public name: string;
  public brandCode: string;
  public unit: Unit;
  public size: string | number;
  public categoryId: string;
  public gender: Gender;
  public brand: Brand;
  public isActive: boolean;
  public image: string;
}
