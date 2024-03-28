import { Attribute } from '../entities/attribute.entity';
declare const CreateAttributeDto_base: import("@nestjs/common").Type<Pick<Attribute, "name" | "shop_id" | "language">>;
export declare class CreateAttributeDto extends CreateAttributeDto_base {
    values: AttributeValueDto[];
}
export declare class AttributeValueDto {
    id: number;
    value: string;
    meta?: string;
    language?: string;
}
export {};
