import { Body, Controller, Get, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ICategoryService } from './iCategory.service.interface';
import { JwtAuthGuard } from '../authentication/jwt-auth/jwt-auth.guard';
import { Category } from './entities/category.entity';
import { CategoryGetAllInput } from './dtos/category-get-all-input.dto';
import { PagedGetAllResult } from 'src/global/dtos/paged-get-all-result.dto';
import { CategoryInput } from './dtos/category-input.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly _categoryService: ICategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getById(@Query() categoryId: string, @Res() res: Response): Promise<Category | void> {
    const category = await this._categoryService.getById(categoryId);

    if (category) return category;
    res.status(404).send();
  }

  @UseGuards(JwtAuthGuard)
  @Get('getAll')
  public async getAll(@Query() getAllInput: CategoryGetAllInput): Promise<PagedGetAllResult<Category>> {
    return await this._categoryService.getAll(getAllInput);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async create(@Body() category: CategoryInput): Promise<Category | null> {
    return await this._categoryService.create(category);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  public async update(
    @Body() category: CategoryInput,
    @Query() categoryId: string,
    @Res() res: Response,
  ): Promise<void> {
    const result = await this._categoryService.update(categoryId, category);

    if (result) {
      res.status(200).send();
    } else {
      res.status(404).send();
    }
  }
}