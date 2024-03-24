import { Product } from '../entities/product.entity';
declare const CreateProductDto_base: import("@nestjs/common").Type<Omit<Product, "id" | "created_at" | "slug" | "type" | "translated_languages" | "updated_at" | "categories" | "orders" | "shop" | "pivot" | "tags" | "related_products" | "min_price" | "max_price">>;
export declare class CreateProductDto extends CreateProductDto_base {
    categories: number[];
    tags: number[];
}
export {};
