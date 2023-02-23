import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoryService } from './category.service';
import { ICategoryService } from './iCategory.service.interface';
import { CategoryController } from './category.controller';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), forwardRef(() => ProductModule)],
  providers: [
    {
      provide: ICategoryService,
      useClass: CategoryService,
    },
  ],
  exports: [ICategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
