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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoriesDto } from './dto/get-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/category").CategoryModel> & import("./schema/category").CategoryModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(query: GetCategoriesDto): Promise<{
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
        data: Omit<import("mongoose").Document<unknown, {}, import("./schema/category").CategoryModel> & import("./schema/category").CategoryModel & {
            _id: import("mongoose").Types.ObjectId;
        }, never>[];
    }>;
    findOne(param: string, language: string): Promise<import("./schema/category").CategoryModel>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/category").CategoryModel> & import("./schema/category").CategoryModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<import("mongodb").DeleteResult>;
}
