import { Body, Controller, Get, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../authentication/jwt-auth/jwt-auth.guard';
import { isUUID } from 'class-validator';
import { PagedGetListResult } from 'rkc.base.back';
import { ProductGetListInput } from './dtos/product-get-list-input.dto';
import { ProductInput } from './dtos/product-input.dto';
import { IProductService } from './IProduct.service.interface';
import ProductOutput from './dtos/product-output';

@Controller('product')
export class ProductController {
  constructor(private readonly _productService: IProductService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':productId')
  public async getById(@Param('productId') productId: string, @Res() res: Response): Promise<ProductOutput | void> {
    if (!isUUID(productId)) {
      res.status(400).send({ message: 'productId must be a valid UUID' });
      return;
    }
    const product = await this._productService.getById(productId);
    if (product) {
      res.status(200).send(product);
      return;
    }
    res.status(404).send({ message: 'productId not found' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('getList')
  public async getList(@Query() getListInput: ProductGetListInput): Promise<PagedGetListResult<ProductOutput>> {
    return this._productService.getList(getListInput);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async create(@Body() product: ProductInput, @Res() res: Response): Promise<ProductOutput | void> {
    const result = await this._productService.create(product);
    if (result !== null) {
      return result;
    }
    res.status(400).send({ message: 'object don´t match Product' });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':productId')
  public async update(
    @Body() product: ProductInput,
    @Param('productId') productId: string,
    @Res() res: Response,
  ): Promise<void> {
    if (!isUUID(productId)) {
      res.status(400).send({ message: 'productId must be a valid UUID' });
      return;
    }
    const result = await this._productService.update(productId, product);

    if (result) {
      res.status(200).send();
    } else {
      res.status(400).send({ message: 'productId not found or object don´t match product' });
    }
  }
}
