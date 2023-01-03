import { BaseEntity } from 'rkc.base.back';
import { Brand } from 'src/global/enuns';
import { Column, Entity } from 'typeorm';
import { ICategory } from './iCategory.interface';

@Entity('category')
export class Category extends BaseEntity implements ICategory {
  @Column({ enum: Brand, nullable: false })
  public brand: Brand;
  @Column({ nullable: false })
  public name: string;
}
