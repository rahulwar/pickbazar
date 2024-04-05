import { PaginationArgs } from 'src/common/dto/pagination-args.dto';
import { Paginator } from 'src/common/dto/paginator.dto';
import { ProductModel } from '../schema/products';
export declare class ProductPaginator extends Paginator<ProductModel> {
    data: ProductModel[];
}
export declare class GetProductsDto extends PaginationArgs {
    orderBy?: string;
    sortedBy?: string;
    searchJoin?: string;
    search?: string;
    date_range?: string;
    language?: string;
}
export declare enum QueryProductsOrderByColumn {
    CREATED_AT = "CREATED_AT",
    NAME = "NAME",
    UPDATED_AT = "UPDATED_AT"
}
