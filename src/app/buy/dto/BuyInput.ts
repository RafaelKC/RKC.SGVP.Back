import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty } from 'class-validator';
import { Brand } from 'src/global/enums';
import { IBuy } from 'src/app/buy/entities/iBuy.interface';

export class BuyInput implements Partial<IBuy> {
  @IsDate()
  @IsNotEmpty()
  public buyDate: Date;

  @IsEnum(Brand)
  @Transform((param) => Brand[param.value])
  @IsNotEmpty()
  public brand: Brand;
}
