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
import { Social } from '../entities/profile.entity';
import { Attachment } from 'src/common/entities/attachment.entity';
import { ShopModel } from 'src/shops/schema/shop';
import { Address } from 'src/addresses/entities/address.entity';
export declare class UsersModel extends Document {
    name: string;
    email: string;
    password: string;
    profile: {
        avatar: Attachment;
        bio: string;
        socials: Social[];
        contact: string;
        customer: UsersModel;
    };
    shops: ShopModel[];
    managed_shop: ShopModel;
    is_active: boolean;
    address: Address[];
    permissions: string[];
    wallet: {
        id: string;
        total_points: number;
        points_used: number;
        customer_id: UsersModel;
        available_points: number;
        created_at: Date;
        updated_at: Date;
    };
}
export declare const UsersSchema: import("mongoose").Schema<UsersModel, import("mongoose").Model<UsersModel, any, any, any, Document<unknown, any, UsersModel> & UsersModel & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UsersModel, Document<unknown, {}, import("mongoose").FlatRecord<UsersModel>> & import("mongoose").FlatRecord<UsersModel> & {
    _id: Types.ObjectId;
}>;
