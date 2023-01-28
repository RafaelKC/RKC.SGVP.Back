import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PagedGetListResult } from 'rkc.base.back';
import { Unit } from 'src/global/enums';
import { Raw, Repository } from 'typeorm';
import { ProductGetListInput } from './dtos/product-get-list-input.dto';
import { IProduct } from './entities/iProduct.interface';
import Product from './entities/product.entity';
import { IProductService } from './IProduct.service.interface';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @InjectRepository(Product)
    private readonly _productRepository: Repository<Product>,
  ) {}

  public async getById(productId: string): Promise<Product | null> {
    return await this._productRepository.findOneBy({ id: productId });
  }

  public async getList(filterInput: ProductGetListInput): Promise<PagedGetListResult<Product> | null> {
    const result = await this._productRepository.findAndCount({
      skip: filterInput.skipResultCount,
      take: filterInput.maxResultCount,
      where: {
        brand: filterInput.brand,
        gender: filterInput.gender,
        isActive: filterInput.activesOnly ?? undefined,
        name: Boolean(filterInput.name)
          ? Raw((name) => `LOWER(${name}) LIKE '%${filterInput.name.toLowerCase()}%'`)
          : undefined,
        brandCode: Boolean(filterInput.brandCode)
          ? Raw((brandCode) => `LOWER(${brandCode}) LIKE '%${filterInput.brandCode.toLowerCase()}%'`)
          : undefined,
        categoryId: Boolean(filterInput.categoriesIds.length)
          ? Raw((categoryId) => `LOWER(${categoryId}) IN (${filterInput.categoriesIds.toString()})`)
          : undefined,
      },
    });

    return {
      totalCount: result[1],
      itens: result[0],
    };
  }

  public async create(product: IProduct): Promise<Product | null> {
    if (!this.validateProductInput(product)) {
      return null;
    }
    return await this._productRepository.save(this._productRepository.create(new Product(product)));
  }

  public async update(productId: string, productToUpdate: IProduct): Promise<boolean> {
    if (!this.validateProductInput(productToUpdate)) {
      return false;
    }

    const product = await this.getById(productId);
    if (!product) return false;

    this._productRepository.save(this._productRepository.merge(product, new Product(productToUpdate)));

    return true;
  }

  private validateProductInput(product: IProduct): boolean {
    return !(
      product.brand == null ||
      !product.gender == null ||
      !product.unit == null ||
      !product.brandCode ||
      !product.categoryId ||
      !product.name ||
      !product.size ||
      (product.unit != Unit.Unit && typeof product.size != 'number')
    );
  }
}
