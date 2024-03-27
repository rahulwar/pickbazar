import { Category } from '../entities/category.entity';
declare const CreateCategoryDto_base: import("@nestjs/common").Type<Pick<Category, "name" | "parent" | "slug" | "language" | "type_id" | "details" | "icon" | "image">>;
export declare class CreateCategoryDto extends CreateCategoryDto_base {
}
export {};
