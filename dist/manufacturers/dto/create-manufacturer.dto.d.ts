import { Manufacturer } from '../entities/manufacturer.entity';
declare const CreateManufacturerDto_base: import("@nestjs/common").Type<Omit<Manufacturer, "products_count" | "name" | "slug" | "description" | "cover_image" | "id" | "type" | "translated_languages" | "image" | "socials" | "type_id" | "website">>;
export declare class CreateManufacturerDto extends CreateManufacturerDto_base {
    shop_id?: string;
}
export {};
