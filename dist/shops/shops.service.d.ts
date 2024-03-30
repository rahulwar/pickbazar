import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { GetShopsDto } from './dto/get-shops.dto';
import { GetStaffsDto } from './dto/get-staffs.dto';
import { ShopModel } from './schema/shop';
import mongoose from 'mongoose';
import { UsersModel } from 'src/users/schema/user';
export declare class ShopsService {
    private Shopmodel;
    private shops;
    private nearShops;
    constructor(Shopmodel: mongoose.Model<ShopModel>);
    create(createShopDto: CreateShopDto): Promise<mongoose.Document<unknown, {}, ShopModel> & ShopModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    getShops({ search, limit, page }: GetShopsDto): Promise<{
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
        data: Omit<mongoose.Document<unknown, {}, ShopModel> & ShopModel & {
            _id: mongoose.Types.ObjectId;
        }, never>[];
    }>;
    getStaffs({ shop_id, limit, page }: GetStaffsDto): Promise<{
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
        data: UsersModel[];
    }>;
    getShop(slug: string): Promise<ShopModel>;
    getNearByShop(lat: string, lng: string): Promise<ShopModel[]>;
    update(id: string, updateShopDto: UpdateShopDto): Promise<mongoose.Document<unknown, {}, ShopModel> & ShopModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    approve(id: string): string;
    remove(id: string): Promise<void>;
    disapproveShop(id: string): Promise<mongoose.Document<unknown, {}, ShopModel> & ShopModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    approveShop(id: string): Promise<mongoose.Document<unknown, {}, ShopModel> & ShopModel & {
        _id: mongoose.Types.ObjectId;
    }>;
}
