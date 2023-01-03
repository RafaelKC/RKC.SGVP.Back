import { SelectQueryBuilder } from 'typeorm';
import { PagedGetAllInput } from '../dtos/paged-get-all-input.dto';

export function paginateResult(query: SelectQueryBuilder<any>, filter: PagedGetAllInput): SelectQueryBuilder<any> {
  if (filter.skipResultCount) {
    query = query.skip(filter.skipResultCount);
  }

  if (filter.maxResultCount) {
    query = query.take(filter.maxResultCount);
  }

  return query;
}
