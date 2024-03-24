import { Category } from '../entities/category.entity';
declare const CreateCategoryDto_base: import("@nestjs/common").Type<Pick<Category, "name" | "slug" | "parent" | "details" | "image" | "icon" | "language" | "type_id">>;
export declare class CreateCategoryDto extends CreateCategoryDto_base {
}
export {};
