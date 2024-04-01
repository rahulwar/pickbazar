import { GetFaqsDto } from './dto/get-faqs.dto';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { FaqModel } from './schema/faq';
import mongoose from 'mongoose';
export declare class FaqsService {
    private faqModel;
    private faqs;
    constructor(faqModel: mongoose.Model<FaqModel>);
    create(createFaqDto: CreateFaqDto): Promise<mongoose.Document<unknown, {}, FaqModel> & FaqModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    findAllFaqs({ search, limit, page, shop_id }: GetFaqsDto): Promise<{
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
        data: Omit<mongoose.Document<unknown, {}, FaqModel> & FaqModel & {
            _id: mongoose.Types.ObjectId;
        }, never>[];
    }>;
    getFaq(param: string, language: string): Promise<Omit<mongoose.Document<unknown, {}, FaqModel> & FaqModel & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    update(id: string, updateFaqDto: UpdateFaqDto): Promise<mongoose.Document<unknown, {}, FaqModel> & FaqModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    remove(id: string): Promise<mongoose.mongo.DeleteResult>;
}
