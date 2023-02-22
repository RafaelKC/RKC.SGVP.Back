import { Controller, Get, Param, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { isUUID } from 'class-validator';
import { PagedGetListResult } from 'rkc.base.back';
import { JwtAuthGuard } from '../authentication/jwt-auth/jwt-auth.guard';
import ProductViewOutput from './dto/product-view-output.dto';
import { IProductViewService } from './iProduct-view.service.interface';
import { ProductViewGetListInput } from './dto/product-get-list-input.dto';

@Controller('product-view')
export class ProductViewController {
  constructor(private readonly _productViewService: IProductViewService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':productId')
  public async getById(@Param('productId') productId: string, @Res() res: Response): Promise<ProductViewOutput | void> {
    if (!isUUID(productId)) {
      res.status(400).send({ message: 'productId must be a valid UUID' });
      return;
    }
    const product = await this._productViewService.getById(productId);
    if (product) {
      res.status(200).send(product);
      return;
    }
    res.status(404).send({ message: 'productId not found' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('getList')
  public async getList(@Query() getListInput: ProductViewGetListInput): Promise<PagedGetListResult<ProductViewOutput>> {
    return this._productViewService.getList(getListInput);
  }
}
