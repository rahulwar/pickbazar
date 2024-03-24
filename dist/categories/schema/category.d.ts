/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Document } from 'mongoose';
import { Category } from '../entities/category.entity';
import { Attachment } from 'src/common/entities/attachment.entity';
import { Type } from 'src/types/entities/type.entity';
import { Product } from 'src/products/entities/product.entity';
export declare class CategoryModel extends Document {
    id: string;
    name: string;
    slug: string;
    parent: Category;
    children: Category[];
    details: string;
    image: Attachment;
    icon: string;
    type_id: Type;
    products: Product[];
    language: string;
    translated_language: string[];
}
export declare const CategorySchema: import("mongoose").Schema<CategoryModel, import("mongoose").Model<CategoryModel, any, any, any, Document<unknown, any, CategoryModel> & CategoryModel & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CategoryModel, Document<unknown, {}, import("mongoose").FlatRecord<CategoryModel>> & import("mongoose").FlatRecord<CategoryModel> & {
    _id: import("mongoose").Types.ObjectId;
}>;
