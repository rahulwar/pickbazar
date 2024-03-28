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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { GetStaffsDto } from './dto/get-staffs.dto';
export declare class ShopsController {
    private readonly shopsService;
    constructor(shopsService: ShopsService);
    create(createShopDto: CreateShopDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/shop").ShopModel> & import("./schema/shop").ShopModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getShop(slug: string): Promise<import("./schema/shop").ShopModel>;
    update(id: string, updateShopDto: UpdateShopDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/shop").ShopModel> & import("./schema/shop").ShopModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<void>;
    approveShop(id: string): string;
    disapproveShop(id: string): string;
}
export declare class StaffsController {
    private readonly shopsService;
    constructor(shopsService: ShopsService);
    create(createShopDto: CreateShopDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/shop").ShopModel> & import("./schema/shop").ShopModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getStaffs(query: GetStaffsDto): Promise<{
        count: number;
        current_page: number;
        firstItem: number;
        lastItem: number;
        last_page: number;
        per_page: number;
        total: number;
        first_page_url: string;
        last_page_url: string;
        next_page_url: string;
        prev_page_url: string;
        data: import("../users/schema/user").UsersModel[];
    }>;
    getShop(slug: string): Promise<import("./schema/shop").ShopModel>;
    update(id: string, updateShopDto: UpdateShopDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/shop").ShopModel> & import("./schema/shop").ShopModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<void>;
}
export declare class DisapproveShopController {
    private shopsService;
    constructor(shopsService: ShopsService);
    disapproveShop(id: any): Promise<import("mongoose").Document<unknown, {}, import("./schema/shop").ShopModel> & import("./schema/shop").ShopModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
export declare class ApproveShopController {
    private shopsService;
    constructor(shopsService: ShopsService);
    approveShop(id: any): Promise<import("mongoose").Document<unknown, {}, import("./schema/shop").ShopModel> & import("./schema/shop").ShopModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
export declare class NearByShopController {
    private shopsService;
    constructor(shopsService: ShopsService);
    getNearByShop(lat: string, lng: string): Promise<import("./schema/shop").ShopModel[]>;
}
export declare class NewShopsController {
    private shopsService;
    constructor(shopsService: ShopsService);
}
