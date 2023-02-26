import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsEnum, IsBoolean } from 'class-validator';
import { PagedGetListInput } from 'rkc.base.back';
import { Brand, Gender } from 'src/global/enums';

export class ProductGetListInput extends PagedGetListInput {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  brandCode?: string;

  @IsEnum(Brand)
  @Transform((param) => Brand[param.value])
  @IsOptional()
  brand?: Brand;

  @IsEnum(Gender)
  @Transform((param) => Gender[param.value])
  @IsOptional()
  gender?: Gender;

  @IsOptional()
  @Transform((param) => {
    if (typeof param.value === 'string') {
      return [param.value];
    }
    return param.value;
  })
  categoriesIds?: Array<string>;

  @IsBoolean()
  @Transform((param) => param.value == 1 || param.value === 'true')
  @IsOptional()
  activesOnly: boolean;
}
