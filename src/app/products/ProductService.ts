import { Injectable } from '@nestjs/common';
import { IProductService } from './IProduct.service.interface';

@Injectable()
export class ProductService implements IProductService {}
