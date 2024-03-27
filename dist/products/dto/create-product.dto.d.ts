import { Product } from '../entities/product.entity';
declare const CreateProductDto_base: import("@nestjs/common").Type<Omit<Product, "id" | "type" | "slug" | "created_at" | "updated_at" | "shop" | "translated_languages" | "categories" | "orders" | "pivot" | "tags" | "related_products" | "min_price" | "max_price">>;
export declare class CreateProductDto extends CreateProductDto_base {
    categories: number[];
    tags: number[];
}
export {};
