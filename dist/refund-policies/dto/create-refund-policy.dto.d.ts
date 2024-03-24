import { RefundPolicy } from '../entities/refund-policies.entity';
declare const CreateRefundPolicyDto_base: import("@nestjs/common").Type<Pick<RefundPolicy, "target" | "status" | "title">>;
export declare class CreateRefundPolicyDto extends CreateRefundPolicyDto_base {
}
export {};
