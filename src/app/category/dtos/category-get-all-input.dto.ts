import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { PagedGetListInput } from 'rkc.base.back';
import { Brand } from 'src/global/enums';

export class CategoryGetAllInput extends PagedGetListInput {
  @IsString()
  @IsOptional()
  name: string;

  @IsEnum(Brand)
  @Transform((param) => Brand[param.value])
  @IsOptional()
  brand: Brand;

  @IsBoolean()
  @Transform((param) => param.value == 1 || param.value === 'true')
  @IsOptional()
  activesOnly: boolean;

  @IsOptional()
  @Transform((param) => {
    if (typeof param.value === 'string') {
      return [param.value];
    }
    return param.value;
  })
  categoriesIds: Array<string>;
}
