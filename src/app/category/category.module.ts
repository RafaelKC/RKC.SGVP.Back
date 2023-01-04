import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoryService } from './category.service';
import { ICategoryService } from './iCategory.service.interface';
import { CategoryController } from './category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [
    {
      provide: ICategoryService,
      useClass: CategoryService,
    },
  ],
  controllers: [CategoryController],
})
export class CategoryModule {}
