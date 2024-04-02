import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { GetCouponsDto } from './dto/get-coupons.dto';
import { CouponModel } from './schema/coupon';
import mongoose from 'mongoose';
export declare class CouponsService {
    private couponModel;
    private coupons;
    constructor(couponModel: mongoose.Model<CouponModel>);
    create(createCouponDto: CreateCouponDto): Promise<mongoose.Document<unknown, {}, CouponModel> & CouponModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    getCoupons({ search, limit, page, shop_id }: GetCouponsDto): Promise<{
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
        data: (mongoose.Document<unknown, {}, CouponModel> & CouponModel & {
            _id: mongoose.Types.ObjectId;
        })[];
    }>;
    getCoupon(param: string, language: string): Promise<CouponModel>;
    update(id: string, updateCouponDto: UpdateCouponDto): Promise<mongoose.Document<unknown, {}, CouponModel> & CouponModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    remove(id: string): Promise<mongoose.mongo.DeleteResult>;
    verifyCoupon(code: string): Promise<{
        is_valid: boolean;
        coupon: mongoose.Document<unknown, {}, CouponModel> & CouponModel & {
            _id: mongoose.Types.ObjectId;
        };
    }>;
    approveCoupon(id: string): Promise<mongoose.Document<unknown, {}, CouponModel> & CouponModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    disapproveCoupon(id: string): Promise<mongoose.Document<unknown, {}, CouponModel> & CouponModel & {
        _id: mongoose.Types.ObjectId;
    }>;
}
