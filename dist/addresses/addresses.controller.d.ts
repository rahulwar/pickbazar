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
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
export declare class AddressesController {
    private readonly addressesService;
    constructor(addressesService: AddressesService);
    createAddress(createAddressDto: CreateAddressDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/address").AddressModel> & import("./schema/address").AddressModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    addresses(): Promise<Omit<import("mongoose").Document<unknown, {}, import("./schema/address").AddressModel> & import("./schema/address").AddressModel & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    address(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/address").AddressModel> & import("./schema/address").AddressModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateAddress(id: string, updateAddressDto: UpdateAddressDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/address").AddressModel> & import("./schema/address").AddressModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteAddress(id: string): Promise<import("mongodb").DeleteResult>;
}
