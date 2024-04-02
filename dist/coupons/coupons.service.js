"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponsService = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const coupon_entity_1 = require("./entities/coupon.entity");
const coupons_json_1 = __importDefault(require("../db/pickbazar/coupons.json"));
const fuse_js_1 = __importDefault(require("fuse.js"));
const paginate_1 = require("../common/pagination/paginate");
const mongoose_1 = require("@nestjs/mongoose");
const coupon_1 = require("./schema/coupon");
const mongoose_2 = __importDefault(require("mongoose"));
const coupons = (0, class_transformer_1.plainToClass)(coupon_entity_1.Coupon, coupons_json_1.default);
const options = {
    keys: ['code'],
    threshold: 0.1,
};
const fuse = new fuse_js_1.default(coupons, options);
let CouponsService = class CouponsService {
    constructor(couponModel) {
        this.couponModel = couponModel;
        this.coupons = coupons;
    }
    async create(createCouponDto) {
        const coupon = await this.couponModel.find({ code: createCouponDto.code });
        if (coupon) {
            throw new Error(`Coupon ${createCouponDto.code} already exists`);
        }
        return await this.couponModel.create(createCouponDto);
    }
    async getCoupons({ search, limit, page, shop_id }) {
        if (!page)
            page = 1;
        if (!limit)
            limit = 12;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        let data = this.coupons;
        let query = {};
        if (shop_id) {
            query['shop_id'] = shop_id;
        }
        if (search) {
            const parseSearchParams = search.split(';');
            const searchText = [];
            for (const searchParam of parseSearchParams) {
                const [key, value] = searchParam.split(':');
                if (key !== 'slug') {
                    query[key] = value;
                }
            }
        }
        const results = await this.couponModel
            .find(query)
            .skip(startIndex)
            .limit(limit)
            .exec();
        const totalCount = await this.couponModel.countDocuments(query);
        const url = `/coupons?search=${search}&limit=${limit}`;
        return Object.assign({ data: results }, (0, paginate_1.paginate)(totalCount, page, limit, results.length, url));
    }
    async getCoupon(param, language) {
        const coupon = await this.couponModel.findOne({ code: param });
        if (!coupon) {
            throw new Error(`Coupon not found ${param}`);
        }
        return coupon;
    }
    async update(id, updateCouponDto) {
        const couponExist = await this.couponModel.findOne({ _id: id });
        if (!couponExist) {
            throw new Error(`Coupon not found ${id}`);
        }
        await this.couponModel.updateOne({ _id: id }, { $set: updateCouponDto });
        return await this.couponModel.findById(id);
    }
    async remove(id) {
        return await this.couponModel.deleteOne({ _id: id });
    }
    async verifyCoupon(code) {
        const coupon = await this.couponModel.findOne({ code: code });
        if (!coupon) {
            throw new Error(`Coupon not found`);
        }
        let is_valid = false;
        if (new Date(coupon.expire_at).getTime() > Date.now()) {
            is_valid = true;
        }
        coupon.is_valid = is_valid;
        await coupon.save();
        return {
            is_valid,
            coupon: coupon,
        };
    }
    async approveCoupon(id) {
        const coupon = await this.couponModel.findById(id);
        coupon.is_approve = true;
        await coupon.save();
        return coupon;
    }
    async disapproveCoupon(id) {
        const coupon = await this.couponModel.findById(id);
        coupon.is_approve = false;
        await coupon.save();
        return coupon;
    }
};
CouponsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(coupon_1.CouponModel.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model])
], CouponsService);
exports.CouponsService = CouponsService;
//# sourceMappingURL=coupons.service.js.map