import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { PagedGetAllInput } from 'src/global/dtos/paged-get-all-input.dto';
import { Brand } from 'src/global/enums';

export class CategoryGetAllInput extends PagedGetAllInput {
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
}
