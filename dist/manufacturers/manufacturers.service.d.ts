import { GetTopManufacturersDto } from './dto/get-top-manufacturers.dto';
import { GetManufacturersDto, ManufacturerPaginator } from './dto/get-manufactures.dto';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { ManufacturerModel } from './schema/manufacturer';
import mongoose from 'mongoose';
import { UsersModel } from 'src/users/schema/user';
import { ShopModel } from 'src/shops/schema/shop';
export declare class ManufacturersService {
    private manufacturerModel;
    private usersModel;
    private shopModel;
    private manufacturers;
    constructor(manufacturerModel: mongoose.Model<ManufacturerModel>, usersModel: mongoose.Model<UsersModel>, shopModel: mongoose.Model<ShopModel>);
    create(createManufactureDto: CreateManufacturerDto, request: any): Promise<mongoose.Document<unknown, {}, ManufacturerModel> & ManufacturerModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    getManufactures({ limit, page, search, }: GetManufacturersDto): Promise<ManufacturerPaginator>;
    getTopManufactures({ limit, }: GetTopManufacturersDto): Promise<ManufacturerModel[]>;
    getManufacturesBySlug(slug: string): Promise<ManufacturerModel>;
    update(id: string, updateManufacturesDto: UpdateManufacturerDto): Promise<mongoose.Document<unknown, {}, ManufacturerModel> & ManufacturerModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    remove(id: string): Promise<mongoose.mongo.DeleteResult>;
}
