import { PagedGetAllInput } from 'src/global/dtos/paged-get-all-input.dto';
import { Brand } from 'src/global/enums';

export class CategoryGetAllInput extends PagedGetAllInput {
  filterByName: boolean;
  filterByBrand: boolean;
  name: string;
  brand: Brand;
  activesOnly: boolean;
}
