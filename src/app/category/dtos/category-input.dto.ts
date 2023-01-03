import { IsBoolean, IsEnum, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Brand } from 'src/global/enums';
import { ICategory } from '../entities/iCategory.interface';

export class CategoryInput implements ICategory {
  @IsNotEmpty()
  @IsEnum(Brand)
  public brand: Brand;

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsOptional()
  @IsBoolean()
  public isActive: boolean;

  constructor() {
    this.isActive = true;
  }
}
