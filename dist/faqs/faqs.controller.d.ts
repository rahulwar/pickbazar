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
import { FaqsService } from './faqs.service';
import { GetFaqsDto } from './dto/get-faqs.dto';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
export declare class FaqsController {
    private faqService;
    constructor(faqService: FaqsService);
    createFaq(createFaqDto: CreateFaqDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/faq").FaqModel> & import("./schema/faq").FaqModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(query: GetFaqsDto): Promise<{
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
        data: Omit<import("mongoose").Document<unknown, {}, import("./schema/faq").FaqModel> & import("./schema/faq").FaqModel & {
            _id: import("mongoose").Types.ObjectId;
        }, never>[];
    }>;
    getFaq(param: string, language: string): Promise<Omit<import("mongoose").Document<unknown, {}, import("./schema/faq").FaqModel> & import("./schema/faq").FaqModel & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    update(id: string, language: string, updateFaqDto: UpdateFaqDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/faq").FaqModel> & import("./schema/faq").FaqModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteFaq(id: string): Promise<import("mongodb").DeleteResult>;
}
