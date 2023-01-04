import { Brand } from 'src/global/enums';

export abstract class ICategory {
  public brand: Brand;
  public name: string;
  public isActive: boolean;
}
