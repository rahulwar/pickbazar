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
import { Document, Types } from 'mongoose';
import { Balance, ShopSettings } from '../entities/shop.entity';
import { Attachment } from 'src/common/entities/attachment.entity';
import { UserAddress } from 'src/addresses/entities/address.entity';
import { UsersModel } from 'src/users/schema/user';
export declare class ShopModel extends Document {
    owner_id: number;
    owner: UsersModel;
    staffs: UsersModel[];
    is_active: boolean;
    orders_count: number;
    products_count: number;
    balance: Balance;
    name: string;
    slug: string;
    description: string;
    cover_image: Attachment;
    logo: Attachment;
    address: UserAddress;
    settings: ShopSettings;
    distance: number;
    lat: string;
    lng: string;
}
export declare const ShopSchema: import("mongoose").Schema<ShopModel, import("mongoose").Model<ShopModel, any, any, any, Document<unknown, any, ShopModel> & ShopModel & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ShopModel, Document<unknown, {}, import("mongoose").FlatRecord<ShopModel>> & import("mongoose").FlatRecord<ShopModel> & {
    _id: Types.ObjectId;
}>;
