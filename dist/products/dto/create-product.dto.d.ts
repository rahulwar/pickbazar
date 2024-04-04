import { Product } from '../entities/product.entity';
declare const CreateProductDto_base: import("@nestjs/common").Type<Omit<Product, "id" | "type" | "slug" | "shop" | "translated_languages" | "created_at" | "updated_at" | "tags" | "pivot" | "categories" | "min_price" | "max_price" | "orders" | "related_products">>;
export declare class CreateProductDto extends CreateProductDto_base {
    categories: number[];
    tags: number[];
}
export {};
