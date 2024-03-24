import { Tag } from '../entities/tag.entity';
declare const CreateTagDto_base: import("@nestjs/common").Type<Pick<Tag, "name" | "details" | "image" | "icon" | "type" | "language">>;
export declare class CreateTagDto extends CreateTagDto_base {
}
export {};
