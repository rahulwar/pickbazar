import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Shop } from './entities/shop.entity';
import { GetShopsDto } from './dto/get-shops.dto';
import { GetStaffsDto } from './dto/get-staffs.dto';
import { ShopModel } from './schema/shop';
import mongoose from 'mongoose';
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
        data: (mongoose.Document<unknown, {}, ShopModel> & ShopModel & {
            _id: mongoose.Types.ObjectId;
        })[];
    }>;
    getStaffs({ shop_id, limit, page }: GetStaffsDto): {
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
        data: import("../users/entities/user.entity").User[];
    };
    getShop(slug: string): Shop;
    getNearByShop(lat: string, lng: string): Shop[];
    update(id: number, updateShopDto: UpdateShopDto): Shop;
    approve(id: number): string;
    remove(id: number): string;
    disapproveShop(id: number): Shop;
    approveShop(id: number): Shop;
}
