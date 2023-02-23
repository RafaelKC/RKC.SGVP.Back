import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ICategoryService } from './iCategory.service.interface';
import { JwtAuthGuard } from '../authentication/jwt-auth/jwt-auth.guard';
import { Category } from './entities/category.entity';
import { CategoryGetAllInput } from './dtos/category-get-all-input.dto';
import { CategoryInput } from './dtos/category-input.dto';
import { isUUID } from 'class-validator';
import { PagedGetListResult } from 'rkc.base.back';

@Controller('category')
export class CategoryController {
  constructor(private readonly _categoryService: ICategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':categoryId')
  public async getById(@Param('categoryId') categoryId: string, @Res() res: Response): Promise<Category | void> {
    if (!isUUID(categoryId)) {
      res.status(400).send({ message: 'categoryId must be a valid UUID' });
      return;
    }
    const category = await this._categoryService.getById(categoryId);
    if (category) {
      res.status(200).send(category);
      return;
    }
    res.status(404).send({ message: 'categoryId not found' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('getAll')
  public async getAll(@Query() getAllInput: CategoryGetAllInput): Promise<PagedGetListResult<Category>> {
    return await this._categoryService.getAll(getAllInput);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async create(@Body() category: CategoryInput, @Res() res: Response): Promise<Category | void> {
    const result = await this._categoryService.create(category);
    if (result !== null) {
      return result;
    }
    res.status(400).send({ message: 'object don´t match Category' });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':categoryId')
  public async update(
    @Body() category: CategoryInput,
    @Param('categoryId') categoryId: string,
    @Res() res: Response,
  ): Promise<void> {
    if (!isUUID(categoryId)) {
      res.status(400).send({ message: 'categoryId must be a valid UUID' });
      return;
    }

    const result = await this._categoryService.update(categoryId, category);

    if (result) {
      res.status(200).send();
    } else {
      res.status(404).send({ message: 'categoryId not found' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':categoryId')
  public async delete(@Param('categoryId') categoryId: string, @Res() res: Response): Promise<void> {
    if (!isUUID(categoryId)) {
      res.status(400).send({ message: 'categoryId must be a valid UUID' });
      return;
    }

    const result = await this._categoryService.delete(categoryId);

    if (result) res.status(200).send();
    else res.status(404).send({ message: 'categoryId not found or category in use' });
  }
}
