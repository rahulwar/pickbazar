import { GetFlashSaleDto } from './dto/get-flash-sales.dto';
import { CreateFlashSaleDto } from './dto/create-flash-sale.dto';
import { UpdateFlashSaleDto } from './dto/update-flash-sale.dto';
import { FlashSaleModel } from './schema/flashsale';
import mongoose from 'mongoose';
export declare class FlashSaleService {
    private flashSaleModel;
    private flashSale;
    private productsByFlashSale;
    constructor(flashSaleModel: mongoose.Model<FlashSaleModel>);
    create(createFlashSaleDto: CreateFlashSaleDto): Promise<mongoose.Document<unknown, {}, FlashSaleModel> & FlashSaleModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    findAllFlashSale({ search, limit, page }: GetFlashSaleDto): Promise<{
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
        data: Omit<mongoose.Document<unknown, {}, FlashSaleModel> & FlashSaleModel & {
            _id: mongoose.Types.ObjectId;
        }, never>[];
    }>;
    getFlashSale(param: string, language: string): Promise<mongoose.Document<unknown, {}, FlashSaleModel> & FlashSaleModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    update(id: string, updateFlashSaleDto: UpdateFlashSaleDto): Promise<Omit<mongoose.Document<unknown, {}, FlashSaleModel> & FlashSaleModel & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    remove(id: string): Promise<mongoose.mongo.DeleteResult>;
    findAllProductsByFlashSale({ search, limit, page }: GetFlashSaleDto): Promise<{
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
        data: any[];
    }>;
}
