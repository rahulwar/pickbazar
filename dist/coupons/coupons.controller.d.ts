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
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { GetCouponsDto } from './dto/get-coupons.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
export declare class CouponsController {
    private readonly couponsService;
    constructor(couponsService: CouponsService);
    createCoupon(createCouponDto: CreateCouponDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/coupon").CouponModel> & import("./schema/coupon").CouponModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getCoupons(query: GetCouponsDto): Promise<{
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
        data: (import("mongoose").Document<unknown, {}, import("./schema/coupon").CouponModel> & import("./schema/coupon").CouponModel & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    getCoupon(param: string, language: string): Promise<import("./schema/coupon").CouponModel>;
    verify(param: string, language: string): Promise<import("./schema/coupon").CouponModel>;
    verifyCoupon(code: string): Promise<{
        is_valid: boolean;
        coupon: import("mongoose").Document<unknown, {}, import("./schema/coupon").CouponModel> & import("./schema/coupon").CouponModel & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    updateCoupon(id: string, updateCouponDto: UpdateCouponDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/coupon").CouponModel> & import("./schema/coupon").CouponModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteCoupon(id: string): Promise<import("mongodb").DeleteResult>;
}
export declare class DisapproveCouponController {
    private couponsService;
    constructor(couponsService: CouponsService);
    disapproveCoupon(id: any): Promise<import("mongoose").Document<unknown, {}, import("./schema/coupon").CouponModel> & import("./schema/coupon").CouponModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
export declare class ApproveCouponController {
    private couponsService;
    constructor(couponsService: CouponsService);
    approveCoupon(id: any): Promise<import("mongoose").Document<unknown, {}, import("./schema/coupon").CouponModel> & import("./schema/coupon").CouponModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
