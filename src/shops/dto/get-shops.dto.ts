import { PaginationArgs } from 'src/common/dto/pagination-args.dto';

import { Paginator } from 'src/common/dto/paginator.dto';
import { Shop } from '../entities/shop.entity';
import { ShopModel } from '../schema/shop';

export class ShopPaginator extends Paginator<ShopModel> {
  data: ShopModel[];
}

export class GetShopsDto extends PaginationArgs {
  orderBy?: string;
  search?: string;
  sortedBy?: string;
  is_active?: boolean;
}
