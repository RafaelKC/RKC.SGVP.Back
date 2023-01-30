import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Unit, Gender, Brand } from 'src/global/enums';
import { IProduct } from '../entities/iProduct.interface';

export class ProductInput implements IProduct {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public brandCode: string;

  @IsEnum(Unit)
  @Transform((param) => Unit[param.value])
  @IsNotEmpty()
  public unit: Unit;

  @IsNotEmpty()
  @IsString()
  public size: string | number;

  @IsNotEmpty()
  @IsString()
  public categoryId: string;

  @IsEnum(Gender)
  @Transform((param) => Gender[param.value])
  @IsNotEmpty()
  public gender: Gender;

  @IsEnum(Brand)
  @Transform((param) => Brand[param.value])
  @IsNotEmpty()
  public brand: Brand;

  @IsOptional()
  @IsBoolean()
  public isActive: boolean;

  @IsOptional()
  @IsString()
  public image: string;
}
