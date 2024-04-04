import { RefundPolicy } from '../entities/refund-policies.entity';
declare const CreateRefundPolicyDto_base: import("@nestjs/common").Type<Pick<RefundPolicy, "title" | "status" | "target">>;
export declare class CreateRefundPolicyDto extends CreateRefundPolicyDto_base {
}
export {};
