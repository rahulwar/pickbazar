import { PaginationArgs } from 'src/common/dto/pagination-args.dto';
import { Paginator } from 'src/common/dto/paginator.dto';
import { ShopModel } from '../schema/shop';
export declare class ShopPaginator extends Paginator<ShopModel> {
    data: ShopModel[];
}
export declare class GetShopsDto extends PaginationArgs {
    orderBy?: string;
    search?: string;
    sortedBy?: string;
    is_active?: boolean;
}
