import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PagedGetListResult } from 'rkc.base.back';
import { Repository } from 'typeorm';
import { BuyGetListInput } from './dto/buy-get-list-input.dto';
import { BuyInput } from './dto/BuyInput';
import Buy from './entities/buy.entity';
import { IBuyService } from './iBuy.service.interface';

@Injectable()
export class BuyService implements IBuyService {
  constructor(
    @InjectRepository(Buy)
    private readonly _buyRepository: Repository<Buy>,
  ) {}

  public async getById(buyId: string): Promise<Buy | null> {
    return await this._buyRepository.findOneBy({ id: buyId });
  }

  public async getList(filterInput: BuyGetListInput): Promise<PagedGetListResult<Buy>> {
    const result = await this._buyRepository.findAndCount({
      skip: filterInput.skipResultCount,
      take: filterInput.maxResultCount,
      where: {
        brand: filterInput.brand,
      },
    });

    return {
      totalCount: result[1],
      itens: result[0],
    };
  }

  public async create(buy: BuyInput): Promise<Buy | null> {
    if (buy.brand == null && buy.buyDate == null) return null;

    return await this._buyRepository.save(this._buyRepository.create(new Buy(buy)));
  }
}
