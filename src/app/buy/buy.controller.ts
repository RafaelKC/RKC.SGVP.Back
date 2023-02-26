import { Body, Controller, Get, Param, Post, Query, Res, UseGuards } from '@nestjs/common';.
import { Response } from 'express';
import { IBuyService } from './iBuy.service.interface';
import { JwtAuthGuard } from '../authentication/jwt-auth/jwt-auth.guard';
import { isUUID } from 'class-validator';
import { BuyGetListInput } from './dto/buy-get-list-input.dto';
import { PagedGetListResult } from 'rkc.base.back';
import { BuyInput } from "./dto/BuyInput";
import Buy from './entities/buy.entity';

@Controller('buy')
export class BuyController {
  constructor(private readonly _buyService: IBuyService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':buyId')
  public async getById(@Param('buyId') buyId: string, @Res() res: Response) {
    if (!isUUID(buyId)) {
        res.status(400).send({ message: 'buyId must be a valid UUID' });
        return;
      }
      const buy = await this._buyService.getById(buyId);
      if (buy) {
        res.status(200).send(buy);
        return;
      }
      res.status(404).send({ message: 'buyId not found' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('getAll')
  public async getAll(@Query() getAllInput: BuyGetListInput): Promise<PagedGetListResult<Buy>> {
    return await this._buyService.getAll(getAllInput);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async create(@Body() buy: BuyInput, @Res() res: Response): Promise<Buy | void> {
    const result = await this._buyService.create(buy);
    if (result !== null) {
      return result;
    }
    res.status(400).send({ message: 'object don´t match Buy' });
  }
}
