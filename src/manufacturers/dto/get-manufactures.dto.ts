import { SortOrder } from 'src/common/dto/generic-conditions.dto';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';
import { Paginator } from 'src/common/dto/paginator.dto';
import { Manufacturer } from '../entities/manufacturer.entity';
import { ManufacturerModel } from '../schema/manufacturer';

export class ManufacturerPaginator extends Paginator<ManufacturerModel> {
  data: ManufacturerModel[];
}

export class GetManufacturersDto extends PaginationArgs {
  orderBy?: QueryManufacturersOrderByColumn;
  sortedBy?: SortOrder;
  search?: string;
  language?: string;
}

export enum QueryManufacturersOrderByColumn {
  CREATED_AT = 'CREATED_AT',
  NAME = 'NAME',
  UPDATED_AT = 'UPDATED_AT',
}
