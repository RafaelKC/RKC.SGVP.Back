import { Transform } from 'class-transformer';
import { IsOptional, IsEnum } from 'class-validator';
import { PagedGetListInput } from 'rkc.base.back';
import { Brand } from 'src/global/enums';

export class BuyGetListInput extends PagedGetListInput {
  @IsEnum(Brand)
  @Transform((param) => Brand[param.value])
  @IsOptional()
  brand?: Brand;
}
