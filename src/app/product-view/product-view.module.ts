import { ProductViewService } from './product-view.service';
import { Module } from '@nestjs/common';
import { ProductViewController } from './product-view.controller';
import { IProductViewService } from './iProduct-view.service.interface';
import { ProductModule } from '../product/product.module';
import { CategoryModule } from '../category/category.module';

@Module({
  providers: [
    {
      provide: IProductViewService,
      useClass: ProductViewService,
    },
  ],
  imports: [ProductModule, CategoryModule],
  controllers: [ProductViewController],
})
export class ProductViewModule {}
