import { CoreEntity } from 'src/common/entities/core.entity';
import { UsersModel } from 'src/users/schema/user';
export declare enum AddressType {
    BILLING = "billing",
    SHIPPING = "shipping"
}
export declare class Address extends CoreEntity {
    title: string;
    default: boolean;
    address: UserAddress;
    type: AddressType;
    customer: UsersModel;
}
export declare class UserAddress {
    street_address: string;
    country: string;
    city: string;
    state: string;
    zip: string;
}
