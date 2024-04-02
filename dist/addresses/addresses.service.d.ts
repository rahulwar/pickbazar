import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressModel } from './schema/address';
import mongoose from 'mongoose';
export declare class AddressesService {
    private addressModel;
    constructor(addressModel: mongoose.Model<AddressModel>);
    create(createAddressDto: CreateAddressDto): Promise<mongoose.Document<unknown, {}, AddressModel> & AddressModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    findAll(): Promise<Omit<mongoose.Document<unknown, {}, AddressModel> & AddressModel & {
        _id: mongoose.Types.ObjectId;
    }, never>[]>;
    findOne(id: string): Promise<mongoose.Document<unknown, {}, AddressModel> & AddressModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    update(id: string, updateAddressDto: UpdateAddressDto): Promise<mongoose.Document<unknown, {}, AddressModel> & AddressModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    remove(id: string): Promise<mongoose.mongo.DeleteResult>;
}
