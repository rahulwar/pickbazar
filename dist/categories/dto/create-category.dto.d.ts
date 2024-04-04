import { Category } from '../entities/category.entity';
declare const CreateCategoryDto_base: import("@nestjs/common").Type<Pick<Category, "parent" | "name" | "slug" | "language" | "icon" | "type_id" | "image" | "details">>;
export declare class CreateCategoryDto extends CreateCategoryDto_base {
}
export {};
