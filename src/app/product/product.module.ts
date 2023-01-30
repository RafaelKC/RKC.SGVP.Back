import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Product from './entities/product.entity';
import { IProductService } from './IProduct.service.interface';
import { ProductService } from './ProductService';
import { ProductController } from './product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [
    {
      provide: IProductService,
      useClass: ProductService,
    },
  ],
  controllers: [ProductController],
})
export class ProductModule {}
