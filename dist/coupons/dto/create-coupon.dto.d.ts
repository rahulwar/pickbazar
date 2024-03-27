import { Coupon } from '../entities/coupon.entity';
declare const CreateCouponDto_base: import("@nestjs/common").Type<Pick<Coupon, "type" | "description" | "language" | "image" | "code" | "amount" | "minimum_cart_amount" | "active_from" | "expire_at" | "target">>;
export declare class CreateCouponDto extends CreateCouponDto_base {
}
export {};
