import { Category } from '../entities/category.entity';
declare const CreateCategoryDto_base: import("@nestjs/common").Type<Pick<Category, "parent" | "name" | "slug" | "icon" | "language" | "type_id" | "details" | "image">>;
export declare class CreateCategoryDto extends CreateCategoryDto_base {
}
export {};
