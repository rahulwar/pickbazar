import { StoreNotice } from '../entities/store-notices.entity';
declare const CreateStoreNoticeDto_base: import("@nestjs/common").Type<Pick<StoreNotice, "type" | "description" | "notice" | "expired_at" | "effective_from" | "priority" | "received_by">>;
export declare class CreateStoreNoticeDto extends CreateStoreNoticeDto_base {
}
export {};
