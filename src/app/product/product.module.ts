import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Product from './entities/product.entity';
import { IProductService } from './IProduct.service.interface';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoryModule],
  providers: [
    {
      provide: IProductService,
      useClass: ProductService,
    },
  ],
  exports: [IProductService],
  controllers: [ProductController],
})
export class ProductModule {}
