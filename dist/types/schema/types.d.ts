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
import { Attachment } from 'src/common/entities/attachment.entity';
import { Banner, TypeSettings } from '../entities/type.entity';
export declare class TypesModel extends Document {
    name: string;
    slug: string;
    image: Attachment;
    icon: string;
    banners: Banner[];
    promotional_sliders: Attachment[];
    settings?: TypeSettings;
    language: string;
    translated_languages: string[];
}
export declare const TypesSchema: import("mongoose").Schema<TypesModel, import("mongoose").Model<TypesModel, any, any, any, Document<unknown, any, TypesModel> & TypesModel & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TypesModel, Document<unknown, {}, import("mongoose").FlatRecord<TypesModel>> & import("mongoose").FlatRecord<TypesModel> & {
    _id: import("mongoose").Types.ObjectId;
}>;
