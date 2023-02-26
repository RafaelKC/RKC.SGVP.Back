import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty } from 'class-validator';
import { Brand } from 'src/global/enums';

export class BuyInput {
  @IsDate()
  @IsNotEmpty()
  public buyDate: Date;

  @IsEnum(Brand)
  @Transform((param) => Brand[param.value])
  @IsNotEmpty()
  public brand: Brand;
}
