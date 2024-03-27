import { Author } from '../entities/author.entity';
declare const CreateAuthorDto_base: import("@nestjs/common").Type<Omit<Author, "products_count" | "name" | "slug" | "cover_image" | "id" | "translated_languages" | "bio" | "born" | "death" | "image" | "languages" | "quote" | "socials">>;
export declare class CreateAuthorDto extends CreateAuthorDto_base {
    shop_id?: string;
}
export {};
